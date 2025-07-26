import { graphql } from "@/gql";

export const QUESTION_DETAIL_QUERY = graphql(`
  query QuestionDetail($id: ID!) {
    question(id: $id) {
      id
      title
      description
      category
      difficulty
      referenceAnswer
      database {
        id
        slug
        description
      }
    }
  }
`);

export const QUESTION_REFERENCE_ANSWER_RESULT_QUERY = graphql(`
  query QuestionReferenceAnswerResult($id: ID!) {
    question(id: $id) {
      referenceAnswerResult {
        columns
        rows
      }
    }
  }
`);
