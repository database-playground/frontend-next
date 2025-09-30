import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense } from "react";
import SolvedQuestionsRanking from "./completed-questions";
import PointsRanking from "./points";

export default function Ranking() {
  return (
    <Tabs defaultValue="daily-points">
      <TabsList>
        <TabsTrigger value="daily-points">每日 - 點數</TabsTrigger>
        <TabsTrigger value="weekly-points">每週 - 點數</TabsTrigger>
        <TabsTrigger value="daily-solved-questions">每日 - 做題數</TabsTrigger>
        <TabsTrigger value="weekly-solved-questions">每週 - 做題數</TabsTrigger>
      </TabsList>

      <TabsContent value="daily-points">
        <Suspense fallback={<Skeleton className="h-48" />}>
          <PointsRanking />
        </Suspense>
      </TabsContent>
      <TabsContent value="weekly-points">
        <Suspense fallback={<Skeleton className="h-48" />}>
          <PointsRanking />
        </Suspense>
      </TabsContent>
      <TabsContent value="daily-solved-questions">
        <Suspense fallback={<Skeleton className="h-48" />}>
          <SolvedQuestionsRanking />
        </Suspense>
      </TabsContent>
      <TabsContent value="weekly-solved-questions">
        <Suspense fallback={<Skeleton className="h-48" />}>
          <SolvedQuestionsRanking />
        </Suspense>
      </TabsContent>
    </Tabs>
  );
}
