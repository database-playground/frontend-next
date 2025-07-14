"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { graphql } from "@/gql";
import { useSuspenseQuery } from "@apollo/client";
import { Suspense } from "react";
import CardLayout from "./card";

const GROUP_MEMBERS_QUERY = graphql(`
  query GroupMembersQuery($id: ID!) {
    users(where: { hasGroupWith: { id: $id } }) {
      totalCount
    }
  }
`);

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
