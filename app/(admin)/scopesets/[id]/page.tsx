"use client";

import { useSuspenseQuery } from "@apollo/client";
import { graphql } from "@/gql";
import { SiteHeader } from "@/components/site-header";
import { Suspense } from "react";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PageHeader, { PageHeaderSkeleton } from "@/components/page-header";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { UpdateScopeSetButtonTrigger } from "../_actions/update";
import { DeleteScopeSetButtonTrigger } from "../_actions/delete";

const SCOPESET_HEADER_QUERY = graphql(`
  query ScopeSetHeaderQuery($id: ID!) {
    scopeSet(filter: { id: $id }) {
      id
      slug
      description
    }
  }
`);

const SCOPESET_SCOPES_QUERY = graphql(`
  query ScopeSetScopesQuery($id: ID!) {
    scopeSet(filter: { id: $id }) {
      id
      scopes
    }
  }
`);

const GROUPS_WITH_SCOPESET_QUERY = graphql(`
  query GroupsWithScopeSetQuery {
    groups {
      id
      name
      scopeSet {
        id
      }
    }
  }
`);

export default function ScopeSetPage() {
  const { id } = useParams();

  return (
    <>
      <SiteHeader title="權限集資訊" hasBackButton />
      <main
        className={`
          flex-1 space-y-4 p-4 pt-6
          md:p-8
        `}
      >
        <div className="flex items-center justify-between space-y-2">
          <Suspense fallback={<ScopeSetHeaderSkeleton />}>
            <Header id={id as string} />
          </Suspense>

          <div className="flex items-center gap-2">
            <UpdateScopeSetButtonTrigger id={id as string} />
            <DeleteScopeSetButtonTrigger id={id as string} />
          </div>
        </div>
        <div className={`
          grid grid-cols-1 gap-4
          lg:grid-cols-2
        `}>
          <Suspense fallback={<CardSkeleton title="權限列表" description="這個群組擁有的權限。" />}>
            <ScopesCard id={id as string} />
          </Suspense>

          <Suspense fallback={<CardSkeleton title="擁有此權限集的群組" description="這個權限集被哪些群組使用。" skeletonClassName="h-8" />}> 
            <GroupsCard id={id as string} />
          </Suspense>
        </div>
      </main>
    </>
  );
}

function Header({ id }: { id: string }) {
  const { data } = useSuspenseQuery(SCOPESET_HEADER_QUERY, {
    variables: { id },
  });

  return <PageHeader title={`權限集「${data.scopeSet.slug}」`} description={data.scopeSet.description ?? "這個權限集沒有描述。"} />;
}

function ScopeSetHeaderSkeleton() {
  return (
    <PageHeaderSkeleton description="這個權限集的詳細資訊。" />
  );
}

function ScopesCard({ id }: { id: string }) {
  const { data } = useSuspenseQuery(SCOPESET_SCOPES_QUERY, {
    variables: { id },
  });
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>權限列表</CardTitle>
        <CardDescription>
          這個群組擁有的權限。
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {data.scopeSet.scopes.map((scope) => (
            <Badge key={scope}>
              <code>{scope}</code>
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function CardSkeleton({ title, description, skeletonClassName }: { title: string, description: string, skeletonClassName?: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Skeleton className={cn("h-5 w-1/2", skeletonClassName)} />
      </CardContent>
    </Card>
  )
}

function GroupsCard({ id }: { id: string }) {
  const { data } = useSuspenseQuery(GROUPS_WITH_SCOPESET_QUERY);
  const groupWithThisScopeSet = data.groups.filter((group) => group.scopeSet?.some((scopeSet) => scopeSet.id === id));

  return (
    <Card>
      <CardHeader>
        <CardTitle>擁有此權限集的群組</CardTitle>
        <CardDescription>這個權限集被哪些群組使用。</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {groupWithThisScopeSet.map((group) => (
            <Link href={`/groups/${group.id}`} key={group.id}>
              <Badge>
                <code>{group.name}</code>
              </Badge>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}