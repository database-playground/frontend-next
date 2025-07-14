import { graphql } from "@/gql";

export const SCOPESET_HEADER_QUERY = graphql(`
  query ScopeSetHeaderQuery($id: ID!) {
    scopeSet(filter: { id: $id }) {
      id
      slug
      description
    }
  }
`);

export const SCOPESET_SCOPES_QUERY = graphql(`
  query ScopeSetScopesQuery($id: ID!) {
    scopeSet(filter: { id: $id }) {
      id
      scopes
    }
  }
`);

export const GROUPS_WITH_SCOPESET_QUERY = graphql(`
  query GroupsWithScopeSetQuery {
    groups {
      id
      name
      scopeSet {
        id
      }
    }
  }
`);
