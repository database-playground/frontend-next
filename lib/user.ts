import { graphql } from "@/gql";
import type { BasicUserInfoQuery } from "@/gql/graphql";
import buildUri from "./build-uri";

export type BasicUserInfo = BasicUserInfoQuery["me"];

export const BASIC_USER_INFO_QUERY = graphql(`
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

export function isAdmin(user: BasicUserInfo): boolean {
  return user.group?.name === "admin";
}

export async function logout() {
  const response = await fetch(buildUri("/api/auth/logout"), {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to logout");
  }
}
