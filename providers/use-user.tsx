"use client";

import { BASIC_USER_INFO_QUERY, type BasicUserInfo } from "@/lib/user";
import { useQuery } from "@apollo/client/react";
import { createContext, useContext } from "react";

export interface UserContextValue {
  user?: BasicUserInfo;
  isInitialized: boolean;
}

export const UserContext = createContext<UserContextValue>({
  user: undefined,
  isInitialized: false,
});

export function useUser() {
  const user = useContext(UserContext);
  if (!user) {
    throw new Error("UserContext not found");
  }

  return user;
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { data, loading } = useQuery(BASIC_USER_INFO_QUERY);

  return (
    <UserContext.Provider
      value={{
        user: data?.me,
        isInitialized: !loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
