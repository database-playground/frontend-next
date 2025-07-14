"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

export interface ScopeSet {
  id: string;
  slug: string;
  description: string;
  scopes: string[];
}

export const columns: ColumnDef<ScopeSet>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "slug",
    header: "權限集名稱",
  },
  {
    accessorKey: "description",
    header: "權限集描述",
  },
  {
    accessorKey: "scopes",
    header: "權限",
    cell: ({ row }) => {
      const scopes = row.original.scopes;

      return <code>{scopes.join(", ")}</code>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const scopeSet = row.original
 
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
            <Link href={`/scopesets/${scopeSet.id}`}>
              <DropdownMenuItem>
                檢視權限集
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(scopeSet.id)}
            >
              複製權限集 ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>編輯權限集</DropdownMenuItem>
            <DropdownMenuItem variant="destructive">刪除權限集</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
];
