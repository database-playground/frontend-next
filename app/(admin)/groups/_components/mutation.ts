import { graphql } from "@/gql";

export const GROUP_CREATE_MUTATION = graphql(`
  mutation CreateGroup($input: CreateGroupInput!) {
    createGroup(input: $input) {
      id
    }
  }
`);

export const GROUP_UPDATE_MUTATION = graphql(`
  mutation UpdateGroup($id: ID!, $input: UpdateGroupInput!) {
    updateGroup(id: $id, input: $input) {
      id
    }
  }
`);
