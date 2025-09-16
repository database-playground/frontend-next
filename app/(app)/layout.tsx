import AppShell from "@/components/app-shell";
import { unstable_ViewTransition as ViewTransition } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell>
      <div className="p-3 flex-1 w-full max-w-7xl mx-auto">
        <ViewTransition name="app-content">{children}</ViewTransition>
      </div>
    </AppShell>
  );
}
