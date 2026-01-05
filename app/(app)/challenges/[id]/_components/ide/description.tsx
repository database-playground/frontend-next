import { graphql } from "@/gql";
import { useSuspenseQuery } from "@apollo/client/react";
import { Remark } from "react-remark";

const QUESTION_DESCRIPTION = graphql(`
  query QuestionDescription($id: ID!) {
    question(id: $id) {
      id
      description
    }
  }
`);

export default function QuestionDescription({ id }: { id: string }) {
  const { data } = useSuspenseQuery(QUESTION_DESCRIPTION, {
    variables: { id },
  });
  const { description } = data.question;

  return (
    <div className="prose leading-6 tracking-wide text-foreground select-none">
      <Remark>{description}</Remark>
    </div>
  );
}
