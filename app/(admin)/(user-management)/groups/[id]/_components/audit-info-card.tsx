"use client";

import { CardLayout } from "@/components/card-layout";
import { Skeleton } from "@/components/ui/skeleton";
import { useSuspenseQuery } from "@apollo/client/react";
import { Clock } from "lucide-react";
import { Suspense } from "react";
import { GROUP_AUDIT_INFO_QUERY } from "./query";

export function AuditInfoCard({ id }: { id: string }) {
  return (
    <Suspense fallback={<CardSkeleton />}>
      <CardMain id={id} />
    </Suspense>
  );
}

function CardMain({ id }: { id: string }) {
  const { data } = useSuspenseQuery(GROUP_AUDIT_INFO_QUERY, {
    variables: { id },
  });

  return (
    <CardLayout title="稽核資訊" description="這個群組的建立與更新時間。">
      <ul className="text-sm">
        <li className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>
            建立時間：{new Date(data.group.createdAt).toLocaleString()}
          </span>
        </li>
        <li className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>
            更新時間：{new Date(data.group.updatedAt).toLocaleString()}
          </span>
        </li>
      </ul>
    </CardLayout>
  );
}

function CardSkeleton() {
  return (
    <CardLayout title="稽核資訊" description="這個群組的建立與更新時間。">
      <Skeleton className="h-5 w-7" />
    </CardLayout>
  );
}
