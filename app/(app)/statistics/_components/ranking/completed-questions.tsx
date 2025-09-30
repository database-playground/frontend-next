"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { graphql } from "@/gql";
import { useSuspenseQuery } from "@apollo/client/react";

const MY_SOLVED_QUESTIONS_COUNT = graphql(`
  query MySolvedQuestionsCount {
    me {
      id
      name
      submissionStatistics {
        solvedQuestions
      }
    }
  }
`);

export default function SolvedQuestionsRanking() {
  const { data } = useSuspenseQuery(MY_SOLVED_QUESTIONS_COUNT);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>姓名</TableHead>
          <TableHead>解題數</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow>
          <TableCell>{data.me.name}</TableCell>
          <TableCell>{data.me.submissionStatistics.solvedQuestions}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
