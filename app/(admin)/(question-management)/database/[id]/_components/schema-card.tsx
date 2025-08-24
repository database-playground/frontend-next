"use client";

import { CardLayout } from "@/components/card-layout";
import { useSuspenseQuery } from "@apollo/client/react";
import { DATABASE_DETAIL_QUERY } from "./query";

export function SchemaCard({ id }: { id: string }) {
  const { data } = useSuspenseQuery(DATABASE_DETAIL_QUERY, {
    variables: { id },
  });

  const database = data.database;

  return (
    <CardLayout title="資料結構" description="SQL DDL 建表語句">
      <div className="space-y-4">
        <div>
          <pre
            className={`
              max-h-96 overflow-x-auto rounded-lg border bg-muted p-4 font-mono
              text-xs whitespace-pre-wrap
            `}
          >
            {database.schema}
          </pre>
        </div>

        <div className="border-t pt-2">
          <p className="text-xs text-muted-foreground">
            這些 DDL 語句定義了資料庫的結構，包含所有表格、欄位和約束。
          </p>
        </div>
      </div>
    </CardLayout>
  );
}
