"use client";

import { Logo } from "@/components/logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ERROR_NOT_FOUND, ERROR_NOT_IMPLEMENTED, ERROR_UNAUTHORIZED, ERROR_USER_VERIFIED } from "@/lib/apollo";
import { ApolloError } from "@apollo/client";
import { AlertCircle, Code, Home, Lock, RefreshCw, Search, Shield, WifiOff } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

interface GlobalErrorProps {
  error: (Error & { digest?: string }) | ApolloError;
  reset: () => void;
}

function getErrorInfo(error: Error | ApolloError) {
  // Check if it's an ApolloError
  if (error instanceof ApolloError) {
    // Network errors
    if (error.networkError && "statusCode" in error.networkError) {
      switch (error.networkError.statusCode) {
        case 401:
          return {
            title: "未經授權",
            description: "您的登入狀態已過期，請重新登入。",
            icon: Lock,
            actionHref: "/login",
          };
        case 403:
          return {
            title: "權限不足",
            description: "您沒有權限執行此操作。",
            icon: Shield,
          };
        case 404:
          return {
            title: "找不到資源",
            description: "請求的資源不存在或已被移除。",
            icon: Search,
          };
        case 500:
          return {
            title: "伺服器錯誤",
            description: "伺服器發生內部錯誤，請稍後再試。",
            icon: AlertCircle,
          };
      }
    }

    if (error.networkError) {
      return {
        title: "網路連線錯誤",
        description: "無法連接到伺服器，請檢查網路連線。",
        icon: WifiOff,
      };
    }

    // GraphQL errors with codes
    if (error.graphQLErrors && error.graphQLErrors.length > 0) {
      const firstError = error.graphQLErrors[0];
      const errorCode = firstError.extensions?.code as string;

      switch (errorCode) {
        case ERROR_NOT_FOUND:
          return {
            title: "找不到資料",
            description: "請求的資料不存在或已被刪除。",
            icon: Search,
          };
        case ERROR_UNAUTHORIZED:
          return {
            title: "未經授權",
            description: "請登入後再試，或您的權限不足。",
            icon: Lock,
            actionHref: "/login",
          };
        case ERROR_USER_VERIFIED:
          return {
            title: "帳號已驗證",
            description: "此帳號已經完成驗證程序。",
            icon: Shield,
          };
        case ERROR_NOT_IMPLEMENTED:
          return {
            title: "功能未實作",
            description: "此功能目前尚未實作，請稍後再試。",
            icon: Code,
          };
      }

      return {
        title: "GraphQL 查詢錯誤",
        description: firstError.message || "GraphQL 查詢發生錯誤。",
        icon: AlertCircle,
      };
    }
  }

  // Regular JavaScript errors
  return {
    title: "應用程式發生錯誤",
    description: error.message || "應用程式遇到預期外的錯誤。",
    icon: AlertCircle,
  };
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  const errorInfo = getErrorInfo(error);

  useEffect(() => {
    // Log error to monitoring service
    console.error("Global error:", error);
  }, [error]);

  return (
    <html>
      <body>
        <div
          className={`
            flex min-h-svh flex-col items-center justify-center gap-6
            bg-gradient-to-br from-red-50 via-white to-red-100 p-6
            md:p-10
          `}
        >
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
            Database Playground
          </Link>

          <Card className="max-w-2xl min-w-md">
            <CardHeader
              className={`flex w-full flex-col items-center text-center`}
            >
              <errorInfo.icon className="mb-2 size-7 text-red-500" />
              <CardTitle className="text-xl">{errorInfo.title}</CardTitle>
              <CardDescription>
                {errorInfo.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col items-center gap-4">
              <div className="w-full rounded-md bg-red-50 p-4 text-left">
                <details className="text-sm">
                  <summary className="cursor-pointer font-medium text-red-800">
                    錯誤詳細資訊
                  </summary>
                  <div className="mt-2 space-y-2 text-red-700">
                    <p className="font-medium">{error.name}: {error.message}</p>

                    {error.stack && (
                      <pre
                        className={`
                          overflow-x-auto rounded bg-red-100 p-2 text-xs
                          whitespace-pre-wrap
                        `}
                      >
                          {error.stack}
                      </pre>
                    )}

                    {error instanceof ApolloError && (
                      <div className="space-y-2">
                        {error.networkError && (
                          <div>
                            <Badge
                              variant="destructive"
                              className={`mb-1 text-xs`}
                            >
                              Network Error
                            </Badge>
                            <pre
                              className={`
                                rounded bg-red-100 p-2 text-xs
                                whitespace-pre-wrap
                              `}
                            >
                                {JSON.stringify(error.networkError, null, 2)}
                            </pre>
                          </div>
                        )}

                        {error.graphQLErrors && error.graphQLErrors.length > 0 && (
                          <div>
                            <Badge
                              variant="destructive"
                              className={`mb-1 text-xs`}
                            >
                              GraphQL Errors ({error.graphQLErrors.length})
                            </Badge>
                            <pre
                              className={`
                                rounded bg-red-100 p-2 text-xs
                                whitespace-pre-wrap
                              `}
                            >
                                {JSON.stringify(error.graphQLErrors, null, 2)}
                            </pre>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </details>
              </div>

              <div
                className={`
                  flex flex-col gap-3
                  sm:flex-row
                `}
              >
                <Button
                  onClick={reset}
                  variant="default"
                  className={`flex items-center gap-2`}
                >
                  <RefreshCw className="size-4" />
                  重試
                </Button>

                {errorInfo.actionHref
                  ? (
                    <Button
                      asChild
                      variant="outline"
                      className={`flex items-center gap-2`}
                    >
                      <Link href={errorInfo.actionHref}>
                        前往處理
                      </Link>
                    </Button>
                  )
                  : (
                    <Button
                      asChild
                      variant="outline"
                      className={`flex items-center gap-2`}
                    >
                      <Link href="/">
                        <Home className="size-4" />
                        回到首頁
                      </Link>
                    </Button>
                  )}
              </div>
            </CardContent>

            <CardFooter
              className={`
                justify-center text-center text-xs text-muted-foreground
              `}
            >
              <section className="flex flex-col items-center gap-1">
                <p>如果問題持續發生，請聯絡開發者進行處理。</p>
                <p className="text-red-600">
                  錯誤時間：{new Date().toLocaleString("zh-TW", { timeZone: "Asia/Taipei" })}
                </p>
                {"digest" in error && error.digest && (
                  <p
                    className={`text-red-600`}
                  >
                    錯誤 ID：{error.digest}
                  </p>
                )}
              </section>
            </CardFooter>
          </Card>
        </div>
      </body>
    </html>
  );
}
