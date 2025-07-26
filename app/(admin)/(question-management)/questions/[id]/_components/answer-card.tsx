"use client";

import { CardLayout } from "@/components/card-layout";
import { useSuspenseQuery } from "@apollo/client";
import { QUESTION_DETAIL_QUERY } from "./query";

export function AnswerCard({ id }: { id: string }) {
  const { data } = useSuspenseQuery(QUESTION_DETAIL_QUERY, {
    variables: { id },
  });

  const question = data.question;

  return (
    <CardLayout title="參考答案" description="此題目的標準解答">
      <pre className="text-sm bg-muted p-4 rounded-lg font-mono overflow-x-auto whitespace-pre-wrap border">
        {question.referenceAnswer}
      </pre>
    </CardLayout>
  );
}
