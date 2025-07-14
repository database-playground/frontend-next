"use client";

import { apolloClient } from "@/lib/apollo";
import { ApolloProvider as Provider } from "@apollo/client/react";

export default function ApolloProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider client={apolloClient}>{children}</Provider>;
}
