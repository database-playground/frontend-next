"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { graphql } from "@/gql";
import { useSuspenseQuery } from "@apollo/client/react";

const MY_POINTS = graphql(`
  query MyPoints {
    me {
      id
      name
      totalPoints
    }
  }
`);

export default function PointsRanking() {
  const { data } = useSuspenseQuery(MY_POINTS);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>姓名</TableHead>
          <TableHead>點數</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow>
          <TableCell>{data.me.name}</TableCell>
          <TableCell>{data.me.totalPoints}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
