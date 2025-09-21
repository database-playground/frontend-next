import type { Metadata } from "next";
import Header from "./_header";
import HeaderSkeleton from "./_header/skeleton";
import ChallengePageContent from "./content";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "挑戰題目",
};

export default function ChallengesPage() {
  return (
    <div>
      <Suspense fallback={<HeaderSkeleton />}>
        <Header />
      </Suspense>

      <ChallengePageContent />
    </div>
  );
}
