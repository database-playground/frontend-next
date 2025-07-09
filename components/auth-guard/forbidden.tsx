import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { BasicUserInfo } from '@/lib/user'

export default function Forbidden({ user }: { user: BasicUserInfo }) {
  return (
    <div className="min-h-svh flex flex-col items-center justify-center p-6 md:p-10 bg-gradient-to-br from-red-50 via-white to-red-150">
      <Card className="min-w-md">
        <CardHeader className="flex flex-col items-center text-center w-full">
          <AlertTriangle className="text-red-500 size-7 mb-2" />
          <CardTitle className="text-xl">無權開啟此頁面</CardTitle>
          <CardDescription>
            您所在的身分組沒有權限使用這個管理介面。
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <Button asChild variant="outline">
            <Link href="/">回到主程式</Link>
          </Button>
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground text-center justify-center">
          <section className="flex flex-col items-center gap-1">
            <p>您目前登入的帳號是：{user.name} ({user.email})</p>
            <p>如果這不是您想登入的帳號，請切換 Google 帳號後重新登入</p>
          </section>
        </CardFooter>
      </Card>
    </div>
  )
}
