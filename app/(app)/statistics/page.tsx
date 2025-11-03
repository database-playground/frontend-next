import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ENABLE_STATISTICS_PAGE } from "@/lib/features";
import { AlertCircle } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";
import Board from "./_components/board";
import Ranking from "./_components/ranking";
import Points from "./_components/statistics/points";
import ResolvedQuestions from "./_components/statistics/resolved-questions";

export const metadata: Metadata = {
  title: "統計資料",
};

export default function StatisticsPage() {
  if (!ENABLE_STATISTICS_PAGE) {
    return (
      <Alert>
        <AlertCircle />
        <AlertTitle>系統管理員停用了「統計資料」頁面。</AlertTitle>
        <AlertDescription>
          如果您需要統計資料，請聯絡系統管理員開啟。<br />
          如果您是系統管理員：請將環境變數中 NEXT_PUBLIC_FEATURE_STATISTICS_PAGE 的否定值改為 true。
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div>
      <Board />

      <div
        className={`
          grid grid-cols-1 gap-8
          md:grid-cols-2
          lg:grid-cols-3
        `}
      >
        <section>
          <h2 className="mb-2 text-lg font-bold">成就報告</h2>

          <Suspense>
            <div className="space-y-4">
              <ResolvedQuestions />
            </div>
          </Suspense>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold">點數</h2>
          <Suspense>
            <Points />
          </Suspense>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold">排行榜</h2>
          <Ranking />
        </section>
      </div>
    </div>
  );
}
