import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, LogOut } from "lucide-react";
import React from "react";

export default function ForbiddenPage() {
  return (
    <div
      className={`
        flex min-h-svh flex-col items-center justify-center bg-gradient-to-br
        from-red-50 via-white to-blue-50 p-6
        md:p-10
      `}
    >
      <Card
        className={`
          flex w-full max-w-sm flex-col items-center gap-6 rounded-2xl border-0
          shadow-xl
        `}
      >
        <CardHeader
          className={`flex w-full flex-col items-center gap-3 text-center`}
        >
          <div
            className={`
              mb-2 flex size-12 items-center justify-center rounded-full
              bg-red-100
            `}
          >
            <AlertTriangle className="size-7 text-red-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">權限不足</CardTitle>
          <CardDescription className="text-base text-gray-500">
            您所在的身分組沒有權限使用這個管理介面。
          </CardDescription>
        </CardHeader>
        <CardFooter className="w-full">
          <Button
            variant="outline"
            className={`
              flex w-full items-center justify-center gap-2 transition-colors
              hover:border-red-200 hover:bg-red-50 hover:text-red-600
            `}
          >
            <LogOut />
            登出
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
