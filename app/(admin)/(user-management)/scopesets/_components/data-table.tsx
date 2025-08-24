"use client";

import { GeneralDataTable } from "@/components/data-table/general";
import { useSuspenseQuery } from "@apollo/client/react";
import { columns, type ScopeSet } from "./data-table-columns";
import { SCOPE_SET_TABLE_QUERY } from "./query";

export function ScopeSetDataTable() {
  const { data } = useSuspenseQuery(SCOPE_SET_TABLE_QUERY);

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
