import AnswerTable from "@/components/answer/table";
import { graphql } from "@/gql";
import { useSuspenseQuery } from "@apollo/client/react";

export interface CorrectAnswerProps {
  id: string;
}

const CORRECT_ANSWER_QUERY = graphql(`
  query CorrectAnswer($id: ID!) {
    question(id: $id) {
      id
      referenceAnswerResult {
        columns
        rows
      }
    }
  }
`);

export default function CorrectAnswer({ id }: CorrectAnswerProps) {
  const { data } = useSuspenseQuery(CORRECT_ANSWER_QUERY, {
    variables: { id },
  });
  const { columns, rows } = data.question.referenceAnswerResult;

  return (
    <AnswerTable columns={columns} rows={rows} />
  )
}
