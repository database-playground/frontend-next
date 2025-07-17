import { graphql } from "@/gql";

export const GROUP_AUDIT_INFO_QUERY = graphql(`
  query GroupAuditInfo($id: ID!) {
    group(id: $id) {
      id
      createdAt
      updatedAt
    }
  }
`);

export const GROUP_HEADER_QUERY = graphql(`
  query GroupHeader($id: ID!) {
    group(id: $id) {
      id
      name
      description
    }
  }
`);

export const GROUP_MEMBERS_QUERY = graphql(`
  query GroupMembers($id: ID!) {
    users(where: { hasGroupWith: { id: $id } }) {
      totalCount
    }
  }
`);

export const GROUP_SCOPES_QUERY = graphql(`
  query GroupScopes($id: ID!) {
    group(id: $id) {
      id
      scopeSets {
        id
        slug
        scopes
      }
    }
  }
`);
