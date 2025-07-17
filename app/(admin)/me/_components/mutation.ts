import { graphql } from "@/gql";

export const ME_UPDATE_MUTATION = graphql(`
  mutation MeUpdateUserInfo($input: UpdateUserInput!) {
    updateMe(input: $input) {
      id
    }
  }
`);
