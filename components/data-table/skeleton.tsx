import { Skeleton } from "../ui/skeleton";

export function DataTableSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-60 w-full rounded-md border animate-pulse" />

      <div className="flex items-center justify-between gap-20">
        <Skeleton className="h-10 w-24" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-16" />
          <Skeleton className="h-10 w-16" />
        </div>
      </div>
    </div>
  );
}
