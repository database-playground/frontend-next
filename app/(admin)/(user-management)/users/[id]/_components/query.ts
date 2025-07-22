import { graphql } from "@/gql";

export const USER_HEADER_QUERY = graphql(`
  query UserHeader($id: ID!) {
    user(id: $id) {
      id
      name
      email
      avatar
    }
  }
`);

export const USER_GROUP_QUERY = graphql(`
  query UserGroups($id: ID!) {
    user(id: $id) {
      id
      group {
        id
        name
      }
    }
  }
`);

export const USER_AUDIT_INFO_QUERY = graphql(`
  query UserAuditInfo($id: ID!) {
    user(id: $id) {
      id
      createdAt
      updatedAt
    }
  }
`);
