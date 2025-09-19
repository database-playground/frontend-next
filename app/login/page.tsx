import { Logo } from "@/components/logo";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";
import { Suspense } from "react";
import DoYouKnow from "./do-you-know";
import { LoginForm } from "./form";
import { UpstreamStatus, UpstreamStatusPlaceholder } from "./status";
import type { Metadata } from "next";

interface LoginPageProps {
  searchParams: Promise<{
    error?: string;
    error_description?: string;
    message?: string;
    redirect?: string;
  }>;
}

export const metadata: Metadata = {
  title: "登入",
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;

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
        <LoginForm
          error={params.error}
          errorDescription={params.error_description}
          message={params.message}
        />

        {/* Do You Know */}
        <DoYouKnow />

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

            <div className="flex items-center gap-4">
              <Tooltip>
                <TooltipTrigger>
                  <a
                    className="flex items-center gap-2"
                    href="https://github.com/database-playground"
                    target="_blank"
                  >
                    <svg
                      className="h-3.5 w-3.5"
                      role="img"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>GitHub</title>
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                    <span className="text-sm">GitHub</span>
                  </a>
                </TooltipTrigger>

                <TooltipContent>
                  向 GitHub 貢獻程式碼，每次都能直接獲得 200 - 700 點不等的點數！
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
