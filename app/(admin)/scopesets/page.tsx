"use client";

import { useSuspenseQuery } from "@apollo/client";
import { graphql } from "@/gql";
import { SiteHeader } from "@/components/site-header";
import { columns, type ScopeSet } from "./columns";
import { Button } from "@/components/ui/button";
import { GeneralDataTable } from "@/components/data-table/general";
import { Suspense } from "react";
import { DataTableSkeleton } from "@/components/data-table/skeleton";

const SCOPE_SET_QUERY = graphql(`
  query ScopesetPageQuery {
    scopeSets {
      id
      slug
      description
      scopes
    }
  }
`);

export default function ScopesetPage() {
  return (
    <>
      <SiteHeader title="權限集管理" />
      <main className={`
        flex-1 space-y-4 p-4 pt-6
        md:p-8
      `}>
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">權限集管理</h2>
            <p className="text-muted-foreground">管理權限集與其權限。</p>
          </div>
          <Button>新增權限集</Button>
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

  const scopeSetList =
    data?.scopeSets.map(
      (scopeSet) =>
        ({
          id: scopeSet.id,
          slug: scopeSet.slug,
          description: scopeSet.description ?? "",
          scopes: scopeSet.scopes ?? [],
        } satisfies ScopeSet)
    ) ?? [];

  return <GeneralDataTable columns={columns} data={scopeSetList} />;
}
