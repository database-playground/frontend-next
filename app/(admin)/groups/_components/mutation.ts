import { graphql } from "@/gql";

export const GROUP_CREATE_MUTATION = graphql(`
  mutation CreateGroupMutation($input: CreateGroupInput!) {
    createGroup(input: $input) {
      id
    }
  }
`);
