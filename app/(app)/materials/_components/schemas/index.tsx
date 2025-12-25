"use client";

import { graphql } from "@/gql";
import { useSuspenseQuery } from "@apollo/client/react";
import SectionHeader from "../section-header";
import { MaterialsSchemaCard } from "./card";

const MATERIALS_SCHEMA = graphql(`
  query MaterialsSchema {
    databases {
      ...MaterialsSchemaCard
      id
    }
  }
`);

export default function MaterialsSchema() {
  const { data } = useSuspenseQuery(MATERIALS_SCHEMA);

  return (
    <section className="space-y-6">
      <SectionHeader
        title="題庫資料庫列表"
        description="這裡可以下載題庫使用到的資料庫，您可以匯入到 phpMyAdmin 等工具，使用您習慣的工具進行練習。"
      />
      <div
        className={`
          grid grid-cols-1 gap-6
          md:grid-cols-2
          lg:grid-cols-3
        `}
      >
        {data.databases.map((database) => <MaterialsSchemaCard key={database.id} fragment={database} />)}
      </div>
    </section>
  );
}
