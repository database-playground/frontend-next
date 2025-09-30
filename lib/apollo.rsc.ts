import { registerApolloClient } from "@apollo/client-integration-nextjs";
import { makeClient } from "./apollo";
import { getAuthToken } from "./auth";

export const { getClient, query, PreloadQuery } = registerApolloClient(async () => {
  const token = await getAuthToken();
  return makeClient({ token });
});
