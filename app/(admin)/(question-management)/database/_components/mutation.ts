import { graphql } from "@/gql";

export const DATABASE_CREATE_MUTATION = graphql(`
  mutation CreateDatabase($input: CreateDatabaseInput!) {
    createDatabase(input: $input) {
      id
    }
  }
`);

export const DATABASE_UPDATE_MUTATION = graphql(`
  mutation UpdateDatabase($id: ID!, $input: UpdateDatabaseInput!) {
    updateDatabase(id: $id, input: $input) {
      id
    }
  }
`);

export const DATABASE_DELETE_MUTATION = graphql(`
  mutation DeleteDatabase($id: ID!) {
    deleteDatabase(id: $id)
  }
`); 