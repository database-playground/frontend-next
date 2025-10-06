import { Skeleton } from "./ui/skeleton";

export default function PageHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      <p className="text-base text-muted-foreground">{description}</p>
    </div>
  );
}

export function PageHeaderSkeleton({ title, description }: { title?: string; description?: string }) {
  return (
    <div className="space-y-2">
      {title ? <h1 className="text-3xl font-bold tracking-tight">{title}</h1> : (
        <Skeleton
          className={`h-9 w-64`}
        />
      )}
      {description ? <p className="text-base text-muted-foreground">{description}</p> : (
        <Skeleton
          className={`h-5 w-1/2`}
        />
      )}
    </div>
  );
}
