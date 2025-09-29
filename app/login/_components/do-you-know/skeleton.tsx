import { Skeleton } from "@/components/ui/skeleton";

export function DoYouKnowSkeleton() {
  return (
    <div className="flex flex-col justify-center gap-2 text-center">
      <div className="text-sm text-gray-500">你知道嗎？</div>
      <Skeleton className="h-12 w-56 self-center" />
    </div>
  );
}
