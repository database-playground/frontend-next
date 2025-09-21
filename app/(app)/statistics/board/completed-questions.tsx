"use client";

import { graphql } from "@/gql";
import { useSuspenseQuery } from "@apollo/client/react";

const COMPLETED_QUESTIONS = graphql(`
    query CompletedQuestions {
        me {
            submissionStatistics {
                totalQuestions
                solvedQuestions
            }
        }
    }
`);

export default function CompletedQuestionsPercentage() {
  const { data } = useSuspenseQuery(COMPLETED_QUESTIONS);
  const totalQuestions = data.me.submissionStatistics.totalQuestions;
  const solvedQuestions = data.me.submissionStatistics.solvedQuestions;
  const completedPercentage = (solvedQuestions / totalQuestions) * 100;

  return <>{solvedQuestions}/{totalQuestions} ({completedPercentage.toFixed(2)}%)</>;
}
