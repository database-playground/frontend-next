import { graphql } from "@/gql";

export const SCOPE_SET_HEADER_QUERY = graphql(`
  query ScopeSetHeader($id: ID!) {
    scopeSet(filter: { id: $id }) {
      id
      slug
      description
    }
  }
`);

export const SCOPE_SET_SCOPES_QUERY = graphql(`
  query ScopeSetScopes($id: ID!) {
    scopeSet(filter: { id: $id }) {
      id
      scopes
    }
  }
`);

export const GROUPS_WITH_SCOPE_SET_QUERY = graphql(`
  query GroupsWithScopeSet {
    groups {
      id
      name
      scopeSets {
        id
      }
    }
  }
`);
