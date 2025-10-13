"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { graphql } from "@/gql";
import type { RankingPeriod } from "@/gql/graphql";
import { useSuspenseQuery } from "@apollo/client/react";
import { ScoreDiff } from "./score";

const COMPLETED_QUESTIONS_RANKING = graphql(`
  query CompletedQuestionRanking($period: RankingPeriod!) {
    ranking(
      first: 10
      filter: { order: DESC, by: COMPLETED_QUESTIONS, period: $period }
    ) {
      edges {
        node {
          id
          name
          submissionStatistics {
            solvedQuestions
          }
        }
        score
      }
    }
  }
`);

export default function SolvedQuestionsRanking({
  period,
}: {
  period: RankingPeriod;
}) {
  const { data } = useSuspenseQuery(COMPLETED_QUESTIONS_RANKING, {
    variables: { period },
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>姓名</TableHead>
          <TableHead>解題數</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.ranking.edges.map((edge) => {
          return (
            <TableRow key={edge.node.id}>
              <TableCell>{edge.node.name}</TableCell>
              <TableCell>
                {edge.node.submissionStatistics.solvedQuestions} (<ScoreDiff score={edge.score} />)
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
