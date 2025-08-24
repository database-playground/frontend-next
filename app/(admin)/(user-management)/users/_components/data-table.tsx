"use client";

import { CursorDataTable } from "@/components/data-table/cursor";
import type { Direction } from "@/components/data-table/pagination";
import { useSuspenseQuery } from "@apollo/client/react";
import { useState } from "react";
import { columns, type User } from "./data-table-columns";
import { USERS_TABLE_QUERY } from "./query";

export function UsersDataTable() {
  const PAGE_SIZE = 5;
  const [after, setAfter] = useState<string | null>(null);
  const [before, setBefore] = useState<string | null>(null);
  const [direction, setDirection] = useState<Direction>("backward");

  const variables = direction === "backward"
    ? { first: PAGE_SIZE, after, last: undefined, before: undefined }
    : { last: PAGE_SIZE, before, first: undefined, after: undefined };

  const { data } = useSuspenseQuery(USERS_TABLE_QUERY, {
    variables,
  });

  const userList = data?.users.edges
    ?.map((edge) => {
      const user = edge?.node;
      if (!user) return null;
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        group: {
          id: user.group.id,
          slug: user.group.name,
        },
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      } satisfies User;
    })
    .filter((user) => user !== null) ?? [];

  const pageInfo = data?.users.pageInfo;

  const handlePageChange = (direction: Direction) => {
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
    <CursorDataTable
      columns={columns}
      data={userList}
      totalCount={data?.users.totalCount ?? 0}
      hasNextPage={!!pageInfo?.hasNextPage}
      hasPreviousPage={!!pageInfo?.hasPreviousPage}
      onPageChange={handlePageChange}
    />
  );
}
