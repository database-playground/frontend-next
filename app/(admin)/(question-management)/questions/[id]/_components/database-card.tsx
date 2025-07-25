"use client";

import { InformationCard } from "@/components/information-card";
import { Badge } from "@/components/ui/badge";
import { StyledLink } from "@/components/ui/link";
import { useSuspenseQuery } from "@apollo/client";
import { QUESTION_DETAIL_QUERY } from "./query";

export function DatabaseCard({ id }: { id: string }) {
  const { data } = useSuspenseQuery(QUESTION_DETAIL_QUERY, {
    variables: { id },
  });

  const database = data.question.database; // Now single database

  return (
    <InformationCard title="資料庫" description="此題目所屬的資料庫">
      {!database ? (
        <p className="text-sm text-muted-foreground">沒有指定資料庫</p>
      ) : (
        <div className="border rounded-lg p-4 space-y-2">
          <div className="flex items-center gap-2">
            <StyledLink href={`/database/${database.id}`}>
              <Badge variant="secondary">{database.slug}</Badge>
            </StyledLink>
          </div>
          {database.description && (
            <p className="text-sm text-muted-foreground">
              {database.description}
            </p>
          )}
          {database.schema && (
            <div className="mt-2">
              <p className="text-xs font-medium text-muted-foreground mb-1">
                資料庫結構：
              </p>
              <pre className="text-xs bg-muted p-2 rounded font-mono overflow-x-auto max-h-32">
                {database.schema}
              </pre>
            </div>
          )}
        </div>
      )}
    </InformationCard>
  );
} 