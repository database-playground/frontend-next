"use client";

import { ChevronsUpDown, Info, LogOut } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import buildUri from "@/lib/build-uri";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import AppAvatar from "./avatar";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar?: string | null;
  };
}) {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const logout = async () => {
    const loadingToast = toast.loading("正在登出……");

    try {
      const res = await fetch(buildUri("/api/auth/logout"), {
        method: "POST",
        credentials: "include",
      });

      if (res.status === 205) {
        router.push("/login");
        return;
      }

      toast.error("登出失敗", {
        description: res.statusText,
      });
    } catch (error) {
      toast.error("登出失敗", {
        description: error instanceof Error ? error.message : "未知錯誤",
      });
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className={`
                data-[state=open]:bg-sidebar-accent
                data-[state=open]:text-sidebar-accent-foreground
              `}
            >
              <AppAvatar
                src={user.avatar}
                name={user.name}
                className={`h-8 w-8 rounded-lg`}
              />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className={`
              w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg
            `}
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div
                className={`
                  flex items-center gap-2 px-1 py-1.5 text-left text-sm
                `}
              >
                <AppAvatar
                  src={user.avatar}
                  name={user.name}
                  className={`h-8 w-8 rounded-lg`}
                />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href="/me">
                <DropdownMenuItem>
                  <Info />
                  使用者資訊
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut />
              登出
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
