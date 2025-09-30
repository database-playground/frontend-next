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

export async function checkAuthorizedStatus(): Promise<boolean> {
  const token = await getAuthToken();
  if (!token) {
    return false;
  }

  const loggedIn = await getAuthStatus(token)
    .then(result => result.loggedIn)
    .catch(() => false);

  if (!loggedIn) {
    return false;
  }

  return true;
}
