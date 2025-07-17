import { graphql } from "@/gql";

export const CREATE_SCOPE_SET_MUTATION = graphql(`
  mutation CreateScopeSet($input: CreateScopeSetInput!) {
    createScopeSet(input: $input) {
      id
    }
  }
`);

export const UPDATE_SCOPE_SET_MUTATION = graphql(`
  mutation UpdateScopeSet($id: ID!, $input: UpdateScopeSetInput!) {
    updateScopeSet(id: $id, input: $input) {
      id
    }
  }
`);

export const DELETE_SCOPE_SET_MUTATION = graphql(`
  mutation DeleteScopeSet($id: ID!) {
    deleteScopeSet(id: $id)
  }
`);
