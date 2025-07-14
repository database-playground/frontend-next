import { graphql } from "@/gql";

export const SCOPE_SET_CREATE_MUTATION = graphql(`
    mutation CreateScopeSetMutation($input: CreateScopeSetInput!) {
      createScopeSet(input: $input) {
        id
      }
    }
`);

export const SCOPE_SET_UPDATE_MUTATION = graphql(`
    mutation UpdateScopeSetMutation($id: ID!, $input: UpdateScopeSetInput!) {
      updateScopeSet(id: $id, input: $input) {
        id
      }
    }
`);

export const SCOPE_SET_DELETE_MUTATION = graphql(`
    mutation DeleteScopeSetMutation($id: ID!) {
      deleteScopeSet(id: $id)
    }
`);
