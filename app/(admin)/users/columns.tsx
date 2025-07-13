"use client";

import AppAvatar from "@/components/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { StyledLink } from "@/components/ui/link";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
  group: string;
  createdAt: string;
  updatedAt: string;
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "姓名",
  },
  {
    accessorKey: "email",
    header: "Google 帳號",
  },
  {
    accessorKey: "avatar",
    header: "頭貼",
    enableSorting: false,
    cell: ({ row }) => {
      const avatar = row.original.avatar;
      const name = row.original.name;
      return (
        <div className="flex items-center gap-2">
          <AppAvatar src={avatar} name={name} />
        </div>
      );
    },
  },
  {
    accessorKey: "group",
    header: "群組",
    cell: ({ row }) => {
      const group = row.original.group;
      return <StyledLink href={`/groups/${group}`}>{group}</StyledLink>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "建立時間",
    cell: ({ row }) => {
      const createdAt = new Date(row.original.createdAt);
      return <div>{createdAt.toLocaleString('zh-tw')}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: "更新時間",
    cell: ({ row }) => {
      const updatedAt = new Date(row.original.updatedAt);
      return <div>{updatedAt.toLocaleString('zh-tw')}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original
 
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
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.email)}
            >
              複製帳號 ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>編輯使用者</DropdownMenuItem>
            <DropdownMenuItem variant="destructive">刪除使用者</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
];
