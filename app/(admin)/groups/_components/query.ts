import { graphql } from "@/gql";

export const GROUP_QUERY = graphql(`
    query GroupsPageQuery {
        groups {
            id
            name
            description
            scopeSet {
                id
                slug
            }
            createdAt
            updatedAt
        }
    }
`);

export const SCOPE_SET_LIST_QUERY = graphql(`
    query ScopeSetListQuery {
        scopeSets {
            id
            slug
        }
    }
`);
