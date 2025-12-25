"use client";

import { Progress } from "@/components/ui/progress";
import { graphql } from "@/gql";
import { useSuspenseQuery } from "@apollo/client/react";

const RESOLVED_QUESTIONS = graphql(`
  query ResolvedQuestions {
    me {
      id
      submissionStatistics {
        solvedQuestions
        totalQuestions
      }
    }
  }
`);

export default function ResolvedQuestions() {
  const { data } = useSuspenseQuery(RESOLVED_QUESTIONS);
  const totalQuestions = data.me.submissionStatistics.totalQuestions;
  const solvedQuestions = data.me.submissionStatistics.solvedQuestions;
  const resolvedQuestions = totalQuestions > 0 ? (solvedQuestions / totalQuestions) * 100 : 0;

  return (
    <div className="flex flex-col gap-1">
      你攻克了 {resolvedQuestions.toFixed(0)}% 的題目！
      <Progress className="max-w-[50%]" value={resolvedQuestions} />
    </div>
  );
}
