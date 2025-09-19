import type { Metadata } from "next";
import Header from "./_header";
import { Suspense } from "react";
import HeaderSkeleton from "./_header/skeleton";
import QuestionCard from "./_question";
import { QuestionDifficulty } from "@/gql/graphql";

export const metadata: Metadata = {
  title: "挑戰題目",
};

export default function ChallengesPage() {
  return (
    <div>
      <Suspense fallback={<HeaderSkeleton />}>
        <Header />
      </Suspense>

      <QuestionCard
        id={1}
        title="題目1"
        description="題目1的描述"
        difficulty={QuestionDifficulty.Easy}
        category="題目1的類別"
        solveStatus="solved"
      />
    </div>
  )
}
