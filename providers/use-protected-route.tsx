"use server";

import { getAuthStatus, getAuthToken } from "@/lib/auth";
import { redirect, unauthorized } from "next/navigation";

export default async function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = await getAuthToken();
  if (!token) {
    redirect("/login");
  }

  const { loggedIn } = await getAuthStatus(token);
  if (!loggedIn) {
    unauthorized();
  }

  return children;
}
