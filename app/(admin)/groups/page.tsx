"use client";

import { useSuspenseQuery } from "@apollo/client";
import { graphql } from "@/gql";
import { SiteHeader } from "@/components/site-header";
import { columns, type Group } from "./columns";
import { Button } from "@/components/ui/button";
import { GeneralDataTable } from "@/components/data-table/general";
import { DataTableSkeleton } from "@/components/data-table/skeleton";
import { Suspense } from "react";

const GROUP_QUERY = graphql(`
  query GroupsPageQuery {
    groups {
      id
      name
      description
      scopeSet {
        id
        slug
      }
      createdAt
      updatedAt
    }
  }
`);

export default function GroupsPage() {
  return (
    <>
      <SiteHeader title="群組管理" />
      <main className={`
        flex-1 space-y-4 p-4 pt-6
        md:p-8
      `}>
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">群組管理</h2>
            <p className="text-muted-foreground">管理群組與其權限集。</p>
          </div>
          <Button>新增群組</Button>
        </div>
        <div>
          <Suspense fallback={<DataTableSkeleton />}>
            <GroupDataTable />
          </Suspense>
        </div>
      </main>
    </>
  );
}

function GroupDataTable() {
  const { data } = useSuspenseQuery(GROUP_QUERY);

  const groupList =
    data?.groups.map(
      (group) =>
        ({
          id: group.id,
          name: group.name,
          description: group.description ?? "",
          scopeSet: group.scopeSet ?? [],
          createdAt: group.createdAt,
          updatedAt: group.updatedAt,
        } satisfies Group)
    ) ?? [];

  return <GeneralDataTable columns={columns} data={groupList} />;
}
