import { Skeleton } from "@/components/ui/skeleton";

export default function HeaderSkeleton() {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-86" />
      </div>
      
      <Skeleton className="hidden md:block h-16 w-40" />
    </div>
  );
}
