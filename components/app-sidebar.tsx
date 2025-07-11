"use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareUser,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";

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
import { graphql } from "@/gql";
import { useSuspenseQuery } from "@apollo/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

const SIDEBAR_QUERY = graphql(`
  query SidebarUserInfo {
    me {
      name
      email
      avatar
    }
  }
`);

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
  pathname.startsWith("/users") ||
  pathname.startsWith("/groups") ||
  pathname.startsWith("/scopesets");

const buildNavbar = (
  pathname: string
): {
  navMain: NavItem[];
  navSecondary: NavItem[];
  projects: NavSmallItem[];
} => ({
  navMain: [
    {
      title: "使用者管理",
      url: "#",
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
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
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
        <Suspense fallback={<NavUserLoading />}>
          <NavUserMe />
        </Suspense>
      </SidebarFooter>
    </Sidebar>
  );
}

function NavUserMe() {
  const {
    data: { me },
  } = useSuspenseQuery(SIDEBAR_QUERY);

  return <NavUser user={me} />;
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
