"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { graphql } from "@/gql";
import type { RankingPeriod } from "@/gql/graphql";
import { useSuspenseQuery } from "@apollo/client/react";
import { ScoreDiff } from "./score";

const POINTS_RANKING = graphql(`
  query PointsRanking($period: RankingPeriod!) {
    ranking(filter: { order: DESC, by: POINTS, period: $period }, first: 10) {
      edges {
        score
        node {
          id
          name
          totalPoints
        }
      }
    }
  }
`);

export default function PointsRanking({ period }: { period: RankingPeriod }) {
  const { data } = useSuspenseQuery(POINTS_RANKING, {
    variables: { period },
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>姓名</TableHead>
          <TableHead>點數</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.ranking.edges.map((edge) => {
          return (
            <TableRow key={edge.node.id}>
              <TableCell>{edge.node.name}</TableCell>
              <TableCell>
                {edge.node.totalPoints} (<ScoreDiff score={edge.score} />)
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
