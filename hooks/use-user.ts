"use client";

import { BASIC_USER_INFO } from "@/lib/user";
import { useSuspenseQuery } from "@apollo/client/react";

export default function useUser() {
  const { data } = useSuspenseQuery(BASIC_USER_INFO);

  return { user: data?.me };
}
