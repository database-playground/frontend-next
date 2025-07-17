import { DataTableSkeleton } from "@/components/data-table/skeleton";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import { UserDataTable } from "./_components/data-table";

export default function UsersPage() {
  return (
    <>
      <SiteHeader title="使用者" />
      <main
        className={`
          flex-1 space-y-4 p-4 pt-6
          md:p-8
        `}
      >
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">使用者管理</h2>
            <p className="text-muted-foreground">管理使用者與其角色。</p>
          </div>
          <Button>新增使用者</Button>
        </div>
        <div>
          <Suspense fallback={<DataTableSkeleton />}>
            <UserDataTable />
          </Suspense>
        </div>
      </main>
    </>
  );
}
