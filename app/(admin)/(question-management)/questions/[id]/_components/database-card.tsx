"use client";

import { CardLayout } from "@/components/card-layout";
import { Badge } from "@/components/ui/badge";
import { StyledLink } from "@/components/ui/link";
import { useSuspenseQuery } from "@apollo/client";
import { QUESTION_DETAIL_QUERY } from "./query";

export function DatabaseCard({ id }: { id: string }) {
  const { data } = useSuspenseQuery(QUESTION_DETAIL_QUERY, {
    variables: { id },
  });

  const database = data.question.database;

  return (
    <CardLayout title="所屬資料庫" description="這個題目要操作的資料庫。">
      <p>{database.slug}</p>
      <p className="text-sm text-muted-foreground">
        <StyledLink href={`/database/${database.id}`}>
          schema 等資訊 →
        </StyledLink>
      </p>
    </CardLayout>
  );
} 