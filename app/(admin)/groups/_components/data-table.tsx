"use client";

import { GeneralDataTable } from "@/components/data-table/general";
import { useSuspenseQuery } from "@apollo/client";
import { columns, type Group } from "./data-table-columns";
import { GROUPS_TABLE_QUERY } from "./query";

export function GroupDataTable() {
  const { data } = useSuspenseQuery(GROUPS_TABLE_QUERY);

  const groupList = data?.groups.map(
    (group) => ({
      id: group.id,
      name: group.name,
      description: group.description ?? "",
      scopeSets: group.scopeSets ?? [],
      createdAt: group.createdAt,
      updatedAt: group.updatedAt,
    } satisfies Group),
  ) ?? [];

  return <GeneralDataTable columns={columns} data={groupList} />;
}
