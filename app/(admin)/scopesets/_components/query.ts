import { graphql } from "@/gql";

export const SCOPE_SET_QUERY = graphql(`
    query ScopesetPageQuery {
        scopeSets {
            id
            slug
            description
            scopes
        }
    }
`);

export const SCOPE_SET_QUERY_BY_ID = graphql(`
    query ScopesetPageQueryById($id: ID!) {
        scopeSet(filter: { id: $id }) {
            id
            slug
            description
            scopes
        }
    }
`);
