"use client";

import { usePathname } from "next/navigation";
import AppNavbar from "./app-navbar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col min-h-screen gap-4">
      <AppNavbar path={pathname} />
      {children}
    </div>
  );
}
