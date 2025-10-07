"use server";

import { getAuthStatus, getAuthToken } from "@/lib/auth";
import { forbidden, unauthorized } from "next/navigation";

export default async function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = await getAuthToken();
  if (!token) {
    unauthorized();
  }

  const { loggedIn, introspectResult } = await getAuthStatus(token);
  if (!loggedIn || !introspectResult?.active) {
    unauthorized();
  }

  // requires for verification
  if (introspectResult.scope.includes("unverified")) {
    forbidden();
  }

  return children;
}
