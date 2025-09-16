import AppAvatar from "@/components/avatar";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import useUser from "@/hooks/use-user";
import { cn } from "@/lib/utils";
import { BarChart3, BookOpen, ChevronDown, MessageSquare, Swords } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

function NavItem({ icon, label, active = false }: NavItemProps) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "flex h-auto items-center gap-3 rounded px-3 py-2 text-sm",
        active && "bg-primary text-primary-foreground",
      )}
    >
      <div className="h-4 w-4 flex-shrink-0">{icon}</div>
      <span className="whitespace-nowrap">{label}</span>
    </Button>
  );
}

function UserMenu() {
  const { user } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-3 rounded px-3 py-2"
        >
          <AppAvatar src={user?.avatar} name={user?.name} className="h-4 w-4" />
          <span className="whitespace-nowrap">{user?.name}</span>
          <ChevronDown className="h-4 w-4 flex-shrink-0" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <Link prefetch={false} href="/api/auth/logout">
          <DropdownMenuItem>登出</DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function AppNavbar({ path }: { path: string }) {
  const navItemLabel = getActiveNavItemLabel(path);

  return (
    <nav className="border-b border-stone-200 bg-stone-50">
      <div className="flex items-center justify-between px-6 py-0">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Logo and Title */}
          <Link href="/">
            <div className="flex items-center gap-3 px-3 py-4">
              <Logo className="h-4 w-4" />
              <span className="whitespace-nowrap text-stone-900">
                資料庫練功房
              </span>
            </div>
          </Link>

          {/* Navigation Items */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <Link href={item.pathPrefix} key={item.label}>
                <NavItem
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                  active={navItemLabel === item.label}
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Right Section - User Menu */}
        <div className="flex items-center">
          <Suspense>
            <UserMenu />
          </Suspense>
        </div>
      </div>
    </nav>
  );
}

interface NavItem {
  icon: React.ReactNode;
  label: string;
  pathPrefix: string;
}

const navItems: NavItem[] = [
  {
    icon: <BarChart3 className="h-full w-full" />,
    label: "統計資料",
    pathPrefix: "/statistics",
  },
  {
    icon: <Swords className="h-full w-full" />,
    label: "挑戰題目",
    pathPrefix: "/challenges",
  },
  {
    icon: <MessageSquare className="h-full w-full" />,
    label: "經驗分享",
    pathPrefix: "/comments",
  },
  {
    icon: <BookOpen className="h-full w-full" />,
    label: "補充資料",
    pathPrefix: "/materials",
  },
];

function getActiveNavItemLabel(path: string): string | null {
  for (const item of navItems) {
    if (path.startsWith(item.pathPrefix)) {
      return item.label;
    }
  }

  return null;
}
