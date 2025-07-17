import { graphql } from "@/gql";

export const ME_QUERY = graphql(`
  query MeUserInfo {
    me {
      id
      name
      avatar
    }
  }
`);
