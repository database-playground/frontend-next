import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function CheatForbiddenLayout({
  cheatReason,
}: {
  cheatReason: string;
}) {
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
          <CardTitle className="text-xl">您已經被系統判定為作弊</CardTitle>
          <CardDescription className="space-y-2">
            <p>
              您的帳號已被系統判定為作弊，禁止繼續作答。作弊將會導致考試成績作廢，同時我們也會將您的記錄交給校方懲處。
            </p>
            <p>
              如果您沒有作弊行為，請當場與監考官告知，我們判斷後可以解除這個狀態。
            </p>
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
          作弊原因：{cheatReason}
        </CardFooter>
      </Card>
    </div>
  );
}
