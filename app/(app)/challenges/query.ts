import { graphql } from "@/gql";

export const CHALLENGE_STATISTICS_QUERY = graphql(`
  query ChallengeStatisticsQuery {
    me {
        submissionStatistics {
            totalQuestions
            solvedQuestions
            attemptedQuestions
        }
    }
  }
`);
