import { Logo } from "@/components/logo";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import DoYouKnow from "./_components/do-you-know";
import DoYouKnowSkeleton from "./_components/do-you-know/skeleton";
import GithubLink from "./_components/github-link";
import { LoginForm } from "./_components/login-form";
import { UpstreamStatus, UpstreamStatusPlaceholder } from "./_components/status";

export const metadata: Metadata = {
  title: "登入",
};

export default async function LoginPage() {
  return (
    <div
      className={`
        flex min-h-svh items-center justify-center bg-gradient-to-br
        from-blue-100 via-white to-blue-50 px-8 py-6
        lg:px-14 lg:py-8
      `}
    >
      <div className="flex max-w-sm flex-1 flex-col justify-center gap-6">
        <Link
          href="/"
          className={`flex items-center gap-2 self-center font-medium`}
        >
          <div
            className={`
              flex size-6 items-center justify-center rounded-md
              text-primary-foreground
            `}
          >
            <Logo />
          </div>
          資料庫練功坊
        </Link>
        <LoginForm />

        {/* Do You Know */}
        <Suspense fallback={<DoYouKnowSkeleton />}>
          <DoYouKnow />
        </Suspense>

        {/* Bottom Section */}
        <div className="flex flex-col items-center gap-4">
          {/* Status and Navigation */}
          <div
            className={`
              flex flex-wrap items-center gap-4
              lg:gap-8
            `}
          >
            <Suspense fallback={<UpstreamStatusPlaceholder />}>
              <UpstreamStatus />
            </Suspense>

            <div className="h-6 w-px bg-stone-400" />

            <GithubLink />
          </div>
        </div>
      </div>
    </div>
  );
}
