import { graphql } from "@/gql";

export const GROUPS_TABLE_QUERY = graphql(`
  query GroupsTable {
    groups {
      id
      name
      description
      scopeSets {
        id
        slug
      }
      createdAt
      updatedAt
    }
  }
`);

export const GROUP_BY_ID_QUERY = graphql(`
  query GroupById($id: ID!) {
    group(id: $id) {
      id
      name
      description
      scopeSets {
        id
        slug
      }
    }
  }
`);

export const SCOPE_SET_LIST_QUERY = graphql(`
  query ScopeSetList {
    scopeSets {
      id
      slug
    }
  }
`);
