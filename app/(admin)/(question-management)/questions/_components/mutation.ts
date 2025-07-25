import { graphql } from "@/gql";

export const QUESTION_CREATE_MUTATION = graphql(`
  mutation CreateQuestion($input: CreateQuestionInput!) {
    createQuestion(input: $input) {
      id
    }
  }
`);

export const QUESTION_UPDATE_MUTATION = graphql(`
  mutation UpdateQuestion($id: ID!, $input: UpdateQuestionInput!) {
    updateQuestion(id: $id, input: $input) {
      id
    }
  }
`);

export const QUESTION_DELETE_MUTATION = graphql(`
  mutation DeleteQuestion($id: ID!) {
    deleteQuestion(id: $id)
  }
`); 