import { LogOut, AlertTriangle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React from "react";

export default function ForbiddenPage() {
  return (
    <div className="min-h-svh flex flex-col items-center justify-center p-6 md:p-10 bg-gradient-to-br from-red-50 via-white to-blue-50">
      <Card className="w-full max-w-sm flex flex-col items-center gap-6 shadow-xl rounded-2xl border-0">
        <CardHeader className="flex flex-col items-center gap-3 text-center w-full">
          <div className="flex items-center justify-center size-12 rounded-full bg-red-100 mb-2">
            <AlertTriangle className="text-red-500 size-7" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">權限不足</CardTitle>
          <CardDescription className="text-gray-500 text-base">您所在的身分組沒有權限使用這個管理介面。</CardDescription>
        </CardHeader>
        <CardFooter className="w-full">
          <Button 
            variant="outline" 
            className="w-full flex items-center gap-2 justify-center transition-colors hover:bg-red-50 hover:border-red-200 hover:text-red-600"
          >
            <LogOut />
            登出
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
