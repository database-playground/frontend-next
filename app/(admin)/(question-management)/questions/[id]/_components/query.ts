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
        schema
      }
    }
  }
`); 