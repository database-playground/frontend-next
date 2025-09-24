"use client";

import { graphql } from "@/gql";
import { useIsMobile } from "@/hooks/use-mobile";
import { skipToken, useSuspenseQuery } from "@apollo/client/react";

const COMPLETED_QUESTIONS = graphql(`
  query CompletedQuestions {
    me {
      id
      submissionStatistics {
        totalQuestions
        solvedQuestions
      }
    }
  }
`);

export default function CompletedQuestionsPercentage() {
  const isMobile = useIsMobile();

  const { data } = useSuspenseQuery(
    COMPLETED_QUESTIONS,
    isMobile ? skipToken : undefined,
  );

  if (!data) return null;

  const totalQuestions = data.me.submissionStatistics.totalQuestions;
  const solvedQuestions = data.me.submissionStatistics.solvedQuestions;
  const completedPercentage = totalQuestions > 0 ? (solvedQuestions / totalQuestions) * 100 : 0;

  return (
    <>
      {solvedQuestions}/{totalQuestions} ({completedPercentage.toFixed(0)}%)
    </>
  );
}
