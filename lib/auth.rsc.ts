import { getAuthStatus, getAuthToken } from "./auth";

export async function getAuthorizedUserInfo(requiredScopes?: string[]) {
  const token = await getAuthToken();
  if (!token) {
    return null;
  }

  const authStatus = await getAuthStatus(token);

  if (!authStatus.loggedIn || !authStatus.introspectResult?.active) {
    return null;
  }

  // check if the token has the required scope
  if (requiredScopes) {
    for (const scope of requiredScopes) {
      if (authStatus.introspectResult?.scope.includes(scope)) {
        return authStatus.introspectResult;
      }
    }

    return null;
  }

  return authStatus.introspectResult;
}
