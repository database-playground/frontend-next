"use client";

import PageHeader, { PageHeaderSkeleton } from "@/components/page-header";
import { useSuspenseQuery } from "@apollo/client";
import { Suspense } from "react";
import { SCOPESET_HEADER_QUERY } from "./query";

export function Header({ id }: { id: string }) {
  return (
    <Suspense fallback={<HeaderSkeleton />}>
      <HeaderMain id={id} />
    </Suspense>
  );
}

function HeaderMain({ id }: { id: string }) {
  const { data } = useSuspenseQuery(SCOPESET_HEADER_QUERY, {
    variables: { id },
  });

  return (
    <PageHeader
      title={`權限集「${data.scopeSet.slug}」`}
      description={data.scopeSet.description ?? "這個權限集沒有描述。"}
    />
  );
}

function HeaderSkeleton() {
  return <PageHeaderSkeleton description="這個權限集沒有描述。" />;
}
