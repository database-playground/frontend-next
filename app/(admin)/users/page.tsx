"use client";

import { useSuspenseQuery } from "@apollo/client";
import { graphql } from "@/gql";
import { SiteHeader } from "@/components/site-header";
import { DataTable } from "@/components/data-table";
import { columns, type User } from "./columns";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const USERS_QUERY = graphql(`
  query UsersPageQuery($first: Int, $after: Cursor, $last: Int, $before: Cursor) {
    users(first: $first, after: $after, last: $last, before: $before) {
      edges {
        node {
          id
          name
          email
          avatar
          createdAt
          updatedAt
          group {
            name
          }
        }
        cursor
      }
      totalCount
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
        startCursor
      }
    }
  }
`);

type Direction = "forward" | "backward";

export default function UsersPage() {
  const PAGE_SIZE = 5;
  const [after, setAfter] = useState<string | null>(null);
  const [before, setBefore] = useState<string | null>(null);
  const [direction, setDirection] = useState<Direction>("backward");

  const variables = direction === "backward"
    ? { first: PAGE_SIZE, after, last: undefined, before: undefined }
    : { last: PAGE_SIZE, before, first: undefined, after: undefined };

  const { data } = useSuspenseQuery(USERS_QUERY, {
    variables,
  });

  // Map GraphQL data to table format
  const userList =
    (data?.users.edges?.map((edge) => {
      const user = edge?.node;
      if (!user) return null;
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        group: user.group.name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      } satisfies User;
    }).filter((user) => user !== null)) ?? [];

  const pageInfo = data?.users.pageInfo;

  const handlePageChange = (direction: "forward" | "backward") => {
    if (!pageInfo) return;
    if (direction === "forward" && pageInfo.hasNextPage) {
      setAfter(pageInfo.endCursor ?? null);
      setBefore(null);
      setDirection("forward");
    } else if (direction === "backward" && pageInfo.hasPreviousPage) {
      setBefore(pageInfo.startCursor ?? null);
      setAfter(null);
      setDirection("backward");
    }
  };

  return (
    <>
      <SiteHeader title="使用者管理" />
      <main className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">使用者管理</h2>
            <p className="text-muted-foreground">管理使用者與其角色。</p>
          </div>
          <Button>新增使用者</Button>
        </div>
        <div className="space-y-4">
          <DataTable
            columns={columns}
            data={userList}
            totalCount={data?.users.totalCount ?? 0}
            pageSize={PAGE_SIZE}
            hasNextPage={!!pageInfo?.hasNextPage}
            hasPreviousPage={!!pageInfo?.hasPreviousPage}
            onPageChange={handlePageChange}
          />
        </div>
      </main>
    </>
  );
} 