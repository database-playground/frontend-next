"use client";

import { GeneralDataTable } from "@/components/data-table/general";
import { useSuspenseQuery } from "@apollo/client";
import { columns, type Database } from "./data-table-columns";
import { DATABASES_TABLE_QUERY } from "./query";

export function DatabaseDataTable() {
  const { data } = useSuspenseQuery(DATABASES_TABLE_QUERY);

  const databaseList = data?.databases?.map((database) => ({
    id: database.id,
    slug: database.slug,
    description: database.description,
    schema: database.schema,
    relationFigure: database.relationFigure,
  } satisfies Database)) ?? [];

  return (
    <GeneralDataTable
      columns={columns}
      data={databaseList}
    />
  );
}
