import { Skeleton } from "@/components/ui/skeleton";

export default function HeaderSkeleton() {
  return (
    <header className="mb-6 flex items-center gap-6">
      <Skeleton className="h-6 w-42" />
      <div className="h-4 w-px bg-border" />
      <Skeleton className="h-6 w-56" />
    </header>
  );
}
