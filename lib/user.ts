import { graphql } from "@/gql";
import type { BasicUserInfoQuery } from "@/gql/graphql";

export type BasicUserInfo = BasicUserInfoQuery["me"];

export const BASIC_USER_INFO = graphql(`
  query BasicUserInfo {
    me {
      id
      name
      email
      avatar

      group {
        name
      }
    }
  }
`);
