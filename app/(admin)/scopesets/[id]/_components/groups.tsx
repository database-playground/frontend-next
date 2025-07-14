import { useSuspenseQuery } from "@apollo/client";
import { GROUPS_WITH_SCOPESET_QUERY } from "./query";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { CardLayout } from "./card";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export function GroupsCard({ id }: { id: string }) {
  return (
    <Suspense fallback={<CardSkeleton />}>
      <CardMain id={id} />
    </Suspense>
  )
}

function CardMain({ id }: { id: string }) {
  const { data } = useSuspenseQuery(GROUPS_WITH_SCOPESET_QUERY);
  const groupWithThisScopeSet = data.groups.filter((group) =>
    group.scopeSet?.some((scopeSet) => scopeSet.id === id)
  );

  return (
    <CardLayout title="擁有此權限集的群組" description="這個權限集被哪些群組使用。">
        <div className="flex flex-wrap gap-2">
          {groupWithThisScopeSet.map((group) => (
            <Link href={`/groups/${group.id}`} key={group.id}>
              <Badge>
                <code>{group.name}</code>
              </Badge>
            </Link>
          ))}
        </div>
    </CardLayout>
  );
}

function CardSkeleton() {
  return (
    <CardLayout title="擁有此權限集的群組" description="這個權限集被哪些群組使用。">
      <div className="flex flex-wrap gap-2">
        <Skeleton className="h-5 w-1/2" />
      </div>
    </CardLayout>
  )
}
