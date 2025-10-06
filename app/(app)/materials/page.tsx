import PageHeader from "@/components/page-header";
import { Skeleton } from "@/components/ui/skeleton";
import type { Metadata } from "next";
import { Suspense } from "react";
import PointCalculateRules from "./_components/points";
import MaterialsSchema from "./_components/schemas";

export const metadata: Metadata = {
  title: "補充資料",
};

export default function MaterialsPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="補充資料"
        description="詳列題庫使用的資料庫結構、計分標準等項目。"
      />
      <Suspense fallback={<Skeleton className="h-96 w-full rounded-lg" />}>
        <MaterialsSchema />
      </Suspense>

      <PointCalculateRules />
    </div>
  );
}
