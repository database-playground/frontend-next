import { graphql } from "@/gql";

export const USERS_QUERY = graphql(`
  query UsersPageQuery(
    $first: Int
    $after: Cursor
    $last: Int
    $before: Cursor
  ) {
    users(first: $first, after: $after, last: $last, before: $before) {
      edges {
        node {
          id
          name
          email
          avatar
          createdAt
          updatedAt
          group {
            id
            name
          }
        }
      }
      totalCount
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
        startCursor
      }
    }
  }
`);
