"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StyledLink } from "@/components/ui/link";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

export interface Group {
  id: string;
  name: string;
  description: string;
  scopeSet: {
    id: string;
    slug: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export const columns: ColumnDef<Group>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      const group = row.original;

      return (
        <StyledLink href={`/groups/${group.id}`}>
          {group.id}
        </StyledLink>
      );
    },
  },
  {
    accessorKey: "name",
    header: "群組名稱",
  },
  {
    accessorKey: "description",
    header: "群組描述",
  },
  {
    accessorKey: "scopeSet",
    header: "權限集",
    cell: ({ row }) => {
      const scopeSet = row.original.scopeSet;

      return (
        <div className="flex flex-wrap gap-2">
          {scopeSet.map((scope) => <StyledLink href={`/scopesets/${scope.id}`} key={scope.id}>{scope.slug}
          </StyledLink>)}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "建立時間",
    cell: ({ row }) => {
      const createdAt = new Date(row.original.createdAt);
      return <div>{createdAt.toLocaleString("zh-tw")}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: "更新時間",
    cell: ({ row }) => {
      const updatedAt = new Date(row.original.updatedAt);
      return <div>{updatedAt.toLocaleString("zh-tw")}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const group = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">開啟選單</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>動作</DropdownMenuLabel>
            <Link href={`/groups/${group.id}`}>
              <DropdownMenuItem>
                檢視群組
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(group.id)}
            >
              複製群組 ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>編輯群組</DropdownMenuItem>
            <DropdownMenuItem variant="destructive">刪除群組</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
