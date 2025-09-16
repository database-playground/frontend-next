import { redirect } from "next/navigation";
import { getAuthStatus, getAuthToken } from "./auth";

export async function redirectIfAuthenticated(): Promise<void> {
  const token = await getAuthToken();
  if (!token) {
    return;
  }

  const loggedIn = await getAuthStatus(token)
    .then(result => result.loggedIn)
    .catch(() => false);
  if (!loggedIn) {
    return;
  }

  redirect("/");
}
