"use client";

import { CardLayout } from "@/components/card-layout";
import { Skeleton } from "@/components/ui/skeleton";
import { useSuspenseQuery } from "@apollo/client/react";
import { Suspense } from "react";
import { GROUP_MEMBERS_QUERY } from "./query";

export function MembersCard({ id }: { id: string }) {
  return (
    <Suspense fallback={<CardSkeleton />}>
      <CardMain id={id} />
    </Suspense>
  );
}

function CardMain({ id }: { id: string }) {
  const { data } = useSuspenseQuery(GROUP_MEMBERS_QUERY, {
    variables: { id },
  });

  return (
    <CardLayout title="成員人數" description="這個群組的成員人數。">
      <p>{data.users.totalCount}</p>
    </CardLayout>
  );
}

function CardSkeleton() {
  return (
    <CardLayout title="成員人數" description="這個群組的成員人數。">
      <Skeleton className="h-5 w-1/2" />
    </CardLayout>
  );
}
