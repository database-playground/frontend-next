"use client";

import { CardLayout } from "@/components/card-layout";
import { useSuspenseQuery } from "@apollo/client";
import { DATABASE_DETAIL_QUERY } from "./query";

export function RelationCard({ id }: { id: string }) {
  const { data } = useSuspenseQuery(DATABASE_DETAIL_QUERY, {
    variables: { id },
  });

  const database = data.database;

  // Check if the relation figure looks like a URL (basic check)
  const isUrl = database.relationFigure.startsWith('http://') || database.relationFigure.startsWith('https://');

  return (
    <CardLayout title="關係圖" description="資料庫表格關係圖">
      <div className="space-y-4">
        {isUrl ? (
          <div>
            <div className="border rounded-lg overflow-hidden">
              <img 
                src={database.relationFigure} 
                alt="資料庫關係圖" 
                className="w-full h-auto max-h-96 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden p-4 text-center text-muted-foreground">
                無法載入圖片
              </div>
            </div>
          </div>
        ) : (
          <div>
            <pre className="text-sm bg-muted p-4 rounded-lg font-mono overflow-x-auto whitespace-pre-wrap border max-h-80">
              {database.relationFigure}
            </pre>
          </div>
        )}
        
        <div className="pt-2 border-t">
          <p className="text-xs text-muted-foreground">
            關係圖顯示了資料庫中各表格之間的關聯性和主外鍵約束。
          </p>
        </div>
      </div>
    </CardLayout>
  );
} 