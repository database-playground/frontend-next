import { graphql } from "@/gql";

export const GROUP_AUDIT_INFO_QUERY = graphql(`
  query GroupAuditInfoQuery($id: ID!) {
    group(id: $id) {
      id
      createdAt
      updatedAt
    }
  }
`);

export const GROUP_HEADER_QUERY = graphql(`
  query GroupHeaderQuery($id: ID!) {
    group(id: $id) {
      id
      name
      description
    }
  }
`);

export const GROUP_MEMBERS_QUERY = graphql(`
  query GroupMembersQuery($id: ID!) {
    users(where: { hasGroupWith: { id: $id } }) {
      totalCount
    }
  }
`);
