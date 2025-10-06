import AppShell from "@/components/app-shell";
import DynamicPostHogIdentifier from "@/providers/posthog-identifier.dynamic";
import AuthorizedApolloWrapper from "@/providers/use-apollo.rsc";
import ProtectedRoute from "@/providers/use-protected-route";
import { unstable_ViewTransition as ViewTransition } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <AuthorizedApolloWrapper>
        <AppShell>
          <div className="mx-auto w-full max-w-7xl flex-1 p-3">
            <ViewTransition name="app-content">
              <div suppressHydrationWarning>{children}</div>
            </ViewTransition>
          </div>
        </AppShell>
        <DynamicPostHogIdentifier />
      </AuthorizedApolloWrapper>
    </ProtectedRoute>
  );
}
