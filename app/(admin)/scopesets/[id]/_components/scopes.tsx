"use client";

import { CardLayout } from "@/components/information-card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useSuspenseQuery } from "@apollo/client";
import { Suspense } from "react";
import { SCOPE_SET_SCOPES_QUERY } from "./query";

export function ScopesCard({ id }: { id: string }) {
  return (
    <Suspense fallback={<CardSkeleton />}>
      <CardMain id={id} />
    </Suspense>
  );
}

function CardMain({ id }: { id: string }) {
  const { data } = useSuspenseQuery(SCOPE_SET_SCOPES_QUERY, {
    variables: { id },
  });

  return (
    <CardLayout title="權限列表" description="這個群組擁有的權限。">
      <div className="flex flex-wrap gap-2">
        {data.scopeSet.scopes.map((scope) => (
          <Badge key={scope}>
            <code>{scope}</code>
          </Badge>
        ))}
      </div>
    </CardLayout>
  );
}

function CardSkeleton() {
  return (
    <CardLayout title="權限列表" description="這個群組擁有的權限。">
      <div className="flex flex-wrap gap-2">
        <Skeleton className="h-5 w-1/2" />
      </div>
    </CardLayout>
  );
}
