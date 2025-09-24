import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Pickaxe } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";
import Board from "./_components/board";
import Points from "./_components/statistics/points";
import ResolvedQuestions from "./_components/statistics/resolved-questions";

export const metadata: Metadata = {
  title: "統計資料",
};

export default function StatisticsPage() {
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

          <Alert>
            <Pickaxe />
            <AlertTitle>正在實作</AlertTitle>
            <AlertDescription>
              功能正在實作，這裡先佔位！
            </AlertDescription>
          </Alert>
        </section>
      </div>
    </div>
  );
}
