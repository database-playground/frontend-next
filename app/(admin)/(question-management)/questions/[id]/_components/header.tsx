"use client";

import PageHeader, { PageHeaderSkeleton } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { useSuspenseQuery } from "@apollo/client";
import { Suspense } from "react";
import { QUESTION_DETAIL_QUERY } from "./query";

export function Header({ id }: { id: string }) {
  return (
    <Suspense fallback={<HeaderSkeleton />}>
      <HeaderMain id={id} />
    </Suspense>
  );
}

const difficultyMap = {
  easy: { label: "簡單", variant: "default" as const },
  medium: { label: "中等", variant: "secondary" as const },
  hard: { label: "困難", variant: "destructive" as const },
  unspecified: { label: "未指定", variant: "outline" as const },
};

function HeaderMain({ id }: { id: string }) {
  const { data } = useSuspenseQuery(QUESTION_DETAIL_QUERY, {
    variables: { id },
  });

  const question = data.question;
  const difficultyInfo = difficultyMap[question.difficulty as keyof typeof difficultyMap];

  return (
    <div className="flex items-start gap-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="outline">{question.category}</Badge>
          <Badge variant={difficultyInfo.variant}>{difficultyInfo.label}</Badge>
        </div>
      </div>
      <PageHeader
        title={question.title}
        description={question.description}
        className="flex-1"
      />
    </div>
  );
}

function HeaderSkeleton() {
  return (
    <div className="flex items-start gap-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="outline">載入中...</Badge>
          <Badge variant="outline">載入中...</Badge>
        </div>
      </div>
      <PageHeaderSkeleton description="載入中..." />
    </div>
  );
} 