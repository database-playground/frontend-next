"use client";

import {
  BookOpen,
  Frame,
  LibrarySquare,
  LifeBuoy,
  type LucideIcon,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareUser,
} from "lucide-react";
import Image from "next/image";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useUser } from "@/providers/use-user";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface NavItem {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
  items?: NavSubItem[];
}

export interface NavSubItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
}

export interface NavSmallItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

const isUserManagement = (pathname: string) =>
  pathname.startsWith("/users")
  || pathname.startsWith("/groups")
  || pathname.startsWith("/scopesets");

const buildNavbar = (
  pathname: string,
): {
  navMain: NavItem[];
  navSecondary: NavItem[];
  projects: NavSmallItem[];
} => ({
  navMain: [
    {
      title: "使用者管理",
      url: "/users",
      icon: SquareUser,
      isActive: isUserManagement(pathname),
      items: [
        {
          title: "使用者",
          url: "/users",
          isActive: pathname.startsWith("/users"),
        },
        {
          title: "群組",
          url: "/groups",
          isActive: pathname.startsWith("/groups"),
        },
        {
          title: "權限集",
          url: "/scopesets",
          isActive: pathname.startsWith("/scopesets"),
        },
      ],
    },
    {
      title: "題庫管理",
      url: "/questions",
      icon: LibrarySquare,
      isActive: pathname.startsWith("/questions") || pathname.startsWith("/database"),
      items: [
        {
          title: "題庫",
          url: "/questions",
          isActive: pathname.startsWith("/questions"),
        },
        {
          title: "資料庫",
          url: "/database",
          isActive: pathname.startsWith("/database"),
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
});

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const data = buildNavbar(pathname);

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div
                  className={`
                    flex aspect-square size-8 items-center justify-center
                    rounded-lg text-sidebar-primary-foreground
                  `}
                >
                  <Image
                    src="/logo.svg"
                    unoptimized
                    alt="Database Playground"
                    width={16}
                    height={16}
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">資料庫練功坊</span>
                  <span className="truncate text-xs">管理介面</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUserMe />
      </SidebarFooter>
    </Sidebar>
  );
}

function NavUserMe() {
  const { user, isInitialized } = useUser();

  if (!isInitialized || !user) {
    return <NavUserLoading />;
  }

  return <NavUser user={user} />;
}

function NavUserLoading() {
  return (
    <NavUser
      user={{
        name: "Loading…",
        email: "載入中…",
        avatar: null,
      }}
    />
  );
}
