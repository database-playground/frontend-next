"use client";

import { CardLayout } from "@/components/card-layout";
import { useSuspenseQuery } from "@apollo/client";
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
          <pre className="text-xs bg-muted p-4 rounded-lg font-mono overflow-x-auto whitespace-pre-wrap border max-h-96">
            {database.schema}
          </pre>
        </div>
        
        <div className="pt-2 border-t">
          <p className="text-xs text-muted-foreground">
            這些 DDL 語句定義了資料庫的結構，包含所有表格、欄位和約束。
          </p>
        </div>
      </div>
    </CardLayout>
  );
} 