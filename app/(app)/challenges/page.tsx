import type { Metadata } from "next";
import Header from "./_header";
import { Suspense } from "react";
import HeaderSkeleton from "./_header/skeleton";

export const metadata: Metadata = {
  title: "挑戰題目",
};

export default function ChallengesPage() {
  return (
    <div>
      <Suspense fallback={<HeaderSkeleton />}>
        <Header />
      </Suspense>
    </div>
  )
}
