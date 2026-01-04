import AppShell from "@/components/app-shell";
import CheatWrapper from "@/components/cheat";
import DynamicPostHogIdentifier from "@/providers/posthog-identifier.dynamic";
import AuthorizedApolloWrapper from "@/providers/use-apollo.rsc";
import ProtectedRoute from "@/providers/use-protected-route";
import { Suspense, ViewTransition } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <ProtectedRoute>
        <AuthorizedApolloWrapper>
          <CheatWrapper>
            <AppShell>
              <div className="mx-auto w-full max-w-7xl flex-1 p-3">
                <ViewTransition name="app-content">{children}</ViewTransition>
              </div>
            </AppShell>
            <DynamicPostHogIdentifier />
          </CheatWrapper>
        </AuthorizedApolloWrapper>
      </ProtectedRoute>
    </Suspense>
  );
}
