import type { Metadata } from "next";
import { Suspense } from "react";
import Header from "./_components/header";
import HeaderSkeleton from "./_components/header/skeleton";
import PracticeIDE from "./_components/ide";

export const metadata: Metadata = {
  title: "挑戰題目",
};

export default async function ChallengePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <Suspense fallback={<HeaderSkeleton />}>
        <Header id={id} />
      </Suspense>

      <Suspense>
        <PracticeIDE id={id} />
      </Suspense>
    </div>
  );
}
