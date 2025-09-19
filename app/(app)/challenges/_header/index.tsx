"use client";

import { useSuspenseQuery } from "@apollo/client/react";
import { CHALLENGE_STATISTICS_QUERY } from "../query";
import { GridProgress } from "@/components/ui/grid-progress";

export default function Header() {
  const { data } = useSuspenseQuery(CHALLENGE_STATISTICS_QUERY);

  const totalQuestions = data.me.submissionStatistics.totalQuestions;
  const totalSolvedQuestions = data.me.submissionStatistics.solvedQuestions;
  const totalAttemptedQuestions =
    data.me.submissionStatistics.attemptedQuestions;

  return (
    <div className="flex items-center justify-between pb-6">
      <div className="space-y-1 tracking-wide">
        <h1 className="text-xl font-bold">
          <HeaderTitle
            totalQuestions={totalQuestions}
            totalSolvedQuestions={totalSolvedQuestions}
          />
        </h1>
        <p>
          <HeaderDescription
            totalSolvedQuestions={totalSolvedQuestions}
            totalAttemptedQuestions={totalAttemptedQuestions}
          />
        </p>
      </div>
      
      <div className="hidden md:block">
        <GridProgress
          variant="primary"
          cols={10}
          rows={4}
          progress={totalSolvedQuestions / totalQuestions * 100}
        />
      </div>
    </div>
  );
}

export function HeaderTitle({
  totalQuestions,
  totalSolvedQuestions,
}: {
  totalQuestions: number;
  totalSolvedQuestions: number;
}) {
  const remainingQuestions = totalQuestions - totalSolvedQuestions;

  if (remainingQuestions === 0) {
    return <>你成功挑戰了所有題目！</>;
  }

  if (remainingQuestions === 1) {
    return <>剩下最後一題就能全數通關！</>;
  }

  return <>繼續挑戰接下來的 {remainingQuestions} 題題目吧！</>;
}

export function HeaderDescription({
  totalSolvedQuestions,
  totalAttemptedQuestions,
}: {
  totalSolvedQuestions: number;
  totalAttemptedQuestions: number;
}) {
  if (totalSolvedQuestions > 0) {
    return (
      <>
        你目前已經嘗試作答了 {totalAttemptedQuestions} 題，其中攻克了{" "}
        {totalSolvedQuestions} 題！
      </>
    );
  }

  if (totalAttemptedQuestions > 0) {
    return (
      <>你目前已經嘗試作答了 {totalAttemptedQuestions} 題，祝你成功攻克題目！</>
    );
  }

  return <>你尚未嘗試作答任何題目，快點試試看你有興趣的題目吧！</>;
}
