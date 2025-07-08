import { graphql } from "@/gql";
import type { BasicUserInfoQuery } from "@/gql/graphql";

export type BasicUserInfo = BasicUserInfoQuery["me"];

export const userQuery = graphql(`
  query BasicUserInfo {
    me {
      name
      email

      group {
        name
      }
    }
  }
`);
