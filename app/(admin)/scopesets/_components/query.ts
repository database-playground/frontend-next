import { graphql } from "@/gql";

export const SCOPE_SET_TABLE_QUERY = graphql(`
  query ScopeSetTable {
    scopeSets {
      id
      slug
      description
      scopes
    }
  }
`);

export const SCOPE_SET_BY_ID_QUERY = graphql(`
  query ScopeSetById($id: ID!) {
    scopeSet(filter: { id: $id }) {
      id
      slug
      description
      scopes
    }
  }
`);
