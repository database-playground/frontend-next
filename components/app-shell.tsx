"use client";

import AppNavbar from "./app-navbar";
import { usePathname } from "next/navigation";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col min-h-screen gap-4">
      <AppNavbar path={pathname} />
      {children}
    </div>
  );
}
