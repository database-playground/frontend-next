import type { Metadata } from "next";
import { Suspense } from "react";
import Header from "./_components/header";
import HeaderSkeleton from "./_components/header/skeleton";
import QuestionsList from "./_components/questions-list";

export const metadata: Metadata = {
  title: "挑戰題目",
};

export default function ChallengesPage() {
  return (
    <div>
      <Suspense fallback={<HeaderSkeleton />}>
        <Header />
      </Suspense>

      <QuestionsList />
    </div>
  );
}
