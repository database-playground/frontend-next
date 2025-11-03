import AppAvatar from "@/components/avatar";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import useUser from "@/hooks/use-user";
import { ENABLE_SOCIAL_PLATFORM, ENABLE_STATISTICS_PAGE } from "@/lib/features";
import { cn } from "@/lib/utils";
import { BarChart3, BookOpen, ChevronDown, Menu, MessageSquare, Swords, X } from "lucide-react";
import Link from "next/link";
import { Suspense, useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
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
        `
          flex h-auto w-full items-center justify-start gap-3 rounded px-3 py-2
          md:w-auto md:justify-center
        `,
        active && "bg-primary text-primary-foreground",
      )}
    >
      <div className="h-4 w-4 shrink-0">{icon}</div>
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
          <ChevronDown className="h-4 w-4 shrink-0" />
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Collapsible open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
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

            {/* Desktop Navigation Items - Hidden on mobile */}
            <div
              className={`
                hidden items-center gap-1
                md:flex
              `}
            >
              {navItems.map((item) => (
                <NavItemLink
                  key={item.label}
                  item={item}
                  active={navItemLabel === item.label}
                />
              ))}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Desktop User Menu - Hidden on mobile */}
            <div
              className={`
                hidden
                md:block
              `}
            >
              <Suspense>
                <UserMenu />
              </Suspense>
            </div>

            {/* Mobile Menu Button - Only visible on mobile */}
            <CollapsibleTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : (
                  <Menu
                    className={`h-5 w-5`}
                  />
                )}
              </Button>
            </CollapsibleTrigger>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <CollapsibleContent className="md:hidden">
          <div className="border-t border-stone-200 bg-stone-50">
            <div className="flex flex-col space-y-1 px-6 py-4">
              {/* Mobile Navigation Items */}
              {navItems.map((item) => (
                <NavItemLink
                  key={item.label}
                  item={item}
                  active={navItemLabel === item.label}
                  onClick={() => setIsMobileMenuOpen(false)}
                />
              ))}

              {/* Mobile User Menu */}
              <div className="mt-4 border-t border-stone-200 pt-4">
                <Suspense>
                  <UserMenu />
                </Suspense>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </nav>
    </Collapsible>
  );
}

interface BaseNavItem {
  icon: React.ReactNode;
  label: string;
}

interface InternalNavItem extends BaseNavItem {
  pathPrefix: string;
}

interface ExternalNavItem extends BaseNavItem {
  externalLink: string;
}

type NavItem = InternalNavItem | ExternalNavItem;

const navItems: NavItem[] = [
  ENABLE_STATISTICS_PAGE
    ? {
      icon: <BarChart3 className="h-full w-full" />,
      label: "統計資料",
      pathPrefix: "/statistics",
    }
    : undefined,
  {
    icon: <Swords className="h-full w-full" />,
    label: "挑戰題目",
    pathPrefix: "/challenges",
  },
  {
    icon: <BookOpen className="h-full w-full" />,
    label: "補充資料",
    pathPrefix: "/materials",
  },
  ENABLE_SOCIAL_PLATFORM
    ? {
      icon: <MessageSquare className="h-full w-full" />,
      label: "意見分享",
      externalLink: "https://community.dbplay.app/discord",
    }
    : undefined,
].filter((item) => item !== undefined);

function getActiveNavItemLabel(path: string): string | null {
  for (const item of navItems) {
    if ("pathPrefix" in item && path.startsWith(item.pathPrefix)) {
      return item.label;
    }
  }

  return null;
}

function NavItemLink({ item, active, onClick }: { item: NavItem; active?: boolean; onClick?: () => void }) {
  if ("pathPrefix" in item) {
    return (
      <Link href={item.pathPrefix} onClick={onClick}>
        <NavItem
          icon={item.icon}
          label={item.label}
          active={active}
        />
      </Link>
    );
  }

  return (
    <a href={item.externalLink} target="_blank" rel="noopener noreferrer" onClick={onClick}>
      <NavItem
        icon={item.icon}
        label={item.label}
        active={active}
      />
    </a>
  );
}
