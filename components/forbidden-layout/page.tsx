import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import AuthorizedApolloWrapper from "@/providers/use-apollo.rsc";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { UserInfo } from "./user-info";

export default async function ForbiddenLayout() {
  return (
    <div
      className={`
        flex min-h-svh flex-col items-center justify-center gap-6
        bg-linear-to-br from-red-50 via-white to-red-100 p-6
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
        資料庫練功坊
      </Link>
      <Card className="min-w-md">
        <CardHeader className="flex w-full flex-col items-center text-center">
          <AlertTriangle className="mb-2 size-7 text-red-500" aria-hidden />
          <CardTitle className="text-xl">無權開啟此頁面</CardTitle>
          <CardDescription>
            您的帳號尚未開通，無法使用系統。請聯絡管理員開通帳號。
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <Button asChild variant="outline">
            <Link href="/login">重新登入</Link>
          </Button>
        </CardContent>
        <CardFooter
          className={`justify-center text-center text-xs text-muted-foreground`}
        >
          <Suspense>
            <AuthorizedApolloWrapper>
              <UserInfo />
            </AuthorizedApolloWrapper>
          </Suspense>
        </CardFooter>
      </Card>
    </div>
  );
}
