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
import { DeleteDatabaseDropdownTrigger } from "./delete";
import { UpdateDatabaseDropdownTrigger } from "./update";

export interface Database {
  id: string;
  slug: string;
  description?: string | null;
  schema: string;
  relationFigure: string;
}

export const columns: ColumnDef<Database>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      const database = row.original;
      return (
        <StyledLink href={`/database/${database.id}`}>
          {database.id}
        </StyledLink>
      );
    },
  },
  {
    accessorKey: "slug",
    header: "Slug",
    cell: ({ row }) => {
      const database = row.original;
      return (
        <div className="font-medium">
          {database.slug}
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "描述",
    cell: ({ row }) => {
      const description = row.original.description;
      if (!description) {
        return <span className="text-muted-foreground">無描述</span>;
      }
      return (
        <div className="max-w-[300px]">
          <div className="truncate text-sm">
            {description}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "schema",
    header: "資料結構",
    cell: ({ row }) => {
      const schema = row.original.schema;
      return (
        <div className="max-w-[200px]">
          <pre
            className={`overflow-hidden rounded bg-muted p-1 font-mono text-xs`}
          >
            {schema.slice(0, 50)}{schema.length > 50 ? "..." : ""}
          </pre>
        </div>
      );
    },
  },
  {
    accessorKey: "relationFigure",
    header: "關係圖",
    cell: ({ row }) => {
      const relationFigure = row.original.relationFigure;
      return (
        <div className="max-w-[200px]">
          <div className="truncate text-xs text-muted-foreground">
            {relationFigure.slice(0, 30)}
            {relationFigure.length > 30 ? "..." : ""}
          </div>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
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
            <DropdownMenuItem asChild>
              <Link href={`/database/${row.original.id}`}>檢視資料庫</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <UpdateDatabaseDropdownTrigger id={row.original.id} />
            <DeleteDatabaseDropdownTrigger id={row.original.id} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
