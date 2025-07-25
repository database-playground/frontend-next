"use client";

import { InformationCard } from "@/components/information-card";
import { useSuspenseQuery } from "@apollo/client";
import { QUESTION_DETAIL_QUERY } from "./query";

export function AnswerCard({ id }: { id: string }) {
  const { data } = useSuspenseQuery(QUESTION_DETAIL_QUERY, {
    variables: { id },
  });

  const question = data.question;

  return (
    <InformationCard title="參考答案" description="此題目的標準解答">
      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-2">
            SQL 參考解答：
          </p>
          <pre className="text-sm bg-muted p-4 rounded-lg font-mono overflow-x-auto whitespace-pre-wrap border">
            {question.referenceAnswer}
          </pre>
        </div>
        
        <div className="pt-2 border-t">
          <p className="text-xs text-muted-foreground">
            注意：這是參考答案，實際應用中可能有多種解決方案。
          </p>
        </div>
      </div>
    </InformationCard>
  );
} 