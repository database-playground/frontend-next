import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

export type Direction = "forward" | "backward";

export interface DataTablePaginationProps {
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onPageChange: (direction: Direction) => void;
}

export default function DataTablePagination({
  totalCount,
  hasNextPage,
  hasPreviousPage,
  onPageChange,
}: DataTablePaginationProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div className="flex-1 text-sm text-muted-foreground">
        總共 {totalCount} 筆資料
      </div>
      <div className="flex items-center justify-end gap-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange("backward")}
          disabled={!hasPreviousPage}
        >
          <ChevronLeft className="h-4 w-4" />
          上一頁
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange("forward")}
          disabled={!hasNextPage}
        >
          下一頁
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
