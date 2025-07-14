"use client";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { graphql } from "@/gql";
import { useSuspenseQuery } from "@apollo/client";
import { Suspense } from "react";
import CardLayout from "./card";

const GROUP_SCOPES_QUERY = graphql(`
  query GroupScopesQuery($id: ID!) {
    group(id: $id) {
      id
      scopeSet {
        id
        slug
        scopes
      }
    }
  }
`);

export function ScopeCard({ id }: { id: string }) {
  return (
    <Suspense fallback={<CardSkeleton />}>
      <CardMain id={id} />
    </Suspense>
  );
}

function CardMain({ id }: { id: string }) {
  const { data } = useSuspenseQuery(GROUP_SCOPES_QUERY, {
    variables: { id },
  });

  const permissionsList = data.group.scopeSet
    ?.map((scopeSet) => {
      return scopeSet.scopes.map((scope) => {
        return {
          scope,
          inheritFrom: scopeSet.slug,
        };
      });
    })
    .flat() ?? [];

  return (
    <CardLayout title="權限列表" description="這個群組擁有的權限。">
      <div className="flex flex-wrap gap-2">
        {permissionsList.map((permission) => (
          <Tooltip key={permission.inheritFrom + "-" + permission.scope}>
            <TooltipTrigger>
              <Badge>
                <code>{permission.scope}</code>
              </Badge>
            </TooltipTrigger>

            <TooltipContent>
              <p>
                繼承自 scope set：<code>{permission.inheritFrom}</code>
              </p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </CardLayout>
  );
}

function CardSkeleton() {
  return (
    <CardLayout title="權限列表" description="這個群組擁有的權限。">
      <Skeleton className="h-5 w-1/2" />
    </CardLayout>
  );
}
