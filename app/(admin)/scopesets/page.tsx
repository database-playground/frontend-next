"use client";

import { GeneralDataTable } from "@/components/data-table/general";
import { DataTableSkeleton } from "@/components/data-table/skeleton";
import { SiteHeader } from "@/components/site-header";
import { useSuspenseQuery } from "@apollo/client";
import { Suspense } from "react";
import { CreateScopeSetTrigger } from "./_components/create";
import { SCOPE_SET_QUERY } from "./_components/query";
import { columns, type ScopeSet } from "./columns";

export default function ScopesetPage() {
  return (
    <>
      <SiteHeader title="權限集" />
      <main
        className={`
          flex-1 space-y-4 p-4 pt-6
          md:p-8
        `}
      >
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">權限集管理</h2>
            <p className="text-muted-foreground">管理權限集與其權限。</p>
          </div>
          <CreateScopeSetTrigger />
        </div>
        <div>
          <Suspense fallback={<DataTableSkeleton />}>
            <ScopeSetDataTable />
          </Suspense>
        </div>
      </main>
    </>
  );
}

function ScopeSetDataTable() {
  const { data } = useSuspenseQuery(SCOPE_SET_QUERY);

  const scopeSetList = data?.scopeSets.map(
    (scopeSet) => ({
      id: scopeSet.id,
      slug: scopeSet.slug,
      description: scopeSet.description ?? "",
      scopes: scopeSet.scopes ?? [],
    } satisfies ScopeSet),
  ) ?? [];

  return <GeneralDataTable columns={columns} data={scopeSetList} />;
}
