import { registerApolloClient } from "@apollo/client-integration-nextjs";
import { headers } from "next/headers";
import { makeClient } from "./apollo";

export const { getClient, query, PreloadQuery } = registerApolloClient(async () => {
  const header = await headers();
  const token = header.get("Authorization")?.split(" ")[1];

  return makeClient({ token });
});
