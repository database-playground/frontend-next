"use client";

import "devtools-detect";
import { useEffect } from "react";
import CheatForbiddenLayout from "./cheat-overlay";
import { graphql, readFragment } from "@/gql";
import { useMutation, useSuspenseQuery } from "@apollo/client/react";

const CREATE_MY_CHEAT_RECORD = graphql(`
  mutation CreateMyCheatRecord($reason: String!) {
    createCheatRecord(reason: $reason) {
      id
    }
  }
`);

const CHEAT_RECORD_CHEAT_REASON = graphql(`
  fragment CheatRecordCheatReason on CheatRecord {
    id
    reason
  }
`);

const GET_MY_CHEAT_RECORD = graphql(`
  query MyCheatRecords {
    me {
      id
      cheating
      cheatRecords(last: 1) {
        edges {
          node {
            ...CheatRecordCheatReason
            id
          }
        }
      }
    }
  }
`);

const THROTTLE_TIME_MS = 1000;

export default function CheatWrapper({ children }: React.PropsWithChildren) {
  const cheatDetectionEnabled = process.env.NEXT_PUBLIC_FEATURE_CHEAT_DETECTION === "true";
  const cheatReason = useCheatReason();

  useCheatDetector({
    enable: cheatDetectionEnabled && !cheatReason
  });

  if (cheatReason) {
    return <CheatForbiddenLayout cheatReason={cheatReason} />;
  }

  return children;
}

export function useCheatDetector({ enable }: { enable?: boolean }) {
  const [createMyCheatRecord] = useMutation(CREATE_MY_CHEAT_RECORD, {
    refetchQueries: [GET_MY_CHEAT_RECORD],
  });

  useEffect(() => {
    if (!enable) {
      return;
    }

    let throttle = false;
    let throttleTimeout: ReturnType<typeof setTimeout> | null = null;

    const createRecord = async (reason: string) => {
      if (throttle) {
        return;
      }
      throttle = true;
  
      await createMyCheatRecord({ variables: { reason } });
  
      throttleTimeout = setTimeout(() => {
        throttle = false;
        throttleTimeout = null;
      }, THROTTLE_TIME_MS);
    };

    const devtoolsChangeHandler = async () => {
      await createRecord("開啟開發者工具");
    };

    const screenLeaveHandler = async () => {
      await createRecord("離開系統");
    };

    window.addEventListener("devtoolschange", devtoolsChangeHandler);
    window.addEventListener("blur", screenLeaveHandler);

    return () => {
      window.removeEventListener("devtoolschange", devtoolsChangeHandler);
      window.removeEventListener("blur", screenLeaveHandler);
      if (throttleTimeout) {
        clearTimeout(throttleTimeout);
      }
    };
  }, [enable, createMyCheatRecord]);
}

export function useCheatReason(): string | undefined {
  const { data } = useSuspenseQuery(GET_MY_CHEAT_RECORD);

  if (!data.me.cheating) {
    return undefined;
  }

  const lastCheatRecord = data.me.cheatRecords?.edges?.[0]?.node;
  if (!lastCheatRecord) {
    return undefined;
  }

  const { reason } = readFragment(CHEAT_RECORD_CHEAT_REASON, lastCheatRecord);
  if (!reason) {
    return undefined;
  }

  return reason;
}
