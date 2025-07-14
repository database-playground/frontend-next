"use client";

import { useSuspenseQuery } from "@apollo/client";
import { graphql } from "@/gql";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import { useParams } from "next/navigation";
import { Clock, Pencil, Trash } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import PageHeader, { PageHeaderSkeleton } from "@/components/page-header";
import { cn } from "@/lib/utils";

const GROUP_HEADER_QUERY = graphql(`
  query GroupHeaderQuery($id: ID!) {
    group(id: $id) {
      id
      name
      description
    }
  }
`);

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

const GROUP_MEMBERS_QUERY = graphql(`
  query GroupMembersQuery($id: ID!) {
    users(where: { hasGroupWith: { id: $id } }) {
      totalCount
    }
  }
`)

const GROUP_AUDIT_INFO_QUERY = graphql(`
  query GroupAuditInfoQuery($id: ID!) {
    group(id: $id) {
      id
      createdAt
      updatedAt
    }
  }
`);


export default function GroupPage() {
  const { id } = useParams();

  return (
    <>
      <SiteHeader title="群組資訊" hasBackButton />
      <main
        className={`
          flex-1 space-y-4 p-4 pt-6
          md:p-8
        `}
      >
        <div className="flex items-center justify-between space-y-2">
          <Suspense fallback={<HeaderSkeleton />}>
            <Header id={id as string} />
          </Suspense>

          <div className="flex items-center gap-2">
            <Button>
              <Pencil className="h-4 w-4" />
              編輯
            </Button>
            <Button variant="destructive">
              <Trash className="h-4 w-4" />
              刪除
            </Button>
          </div>
        </div>
        <div className={`
          grid grid-cols-1 gap-4
          lg:grid-cols-2
        `}>
          <Suspense fallback={<CardSkeleton title="權限列表" description="這個群組擁有的權限。" />}>
            <ScopeCard id={id as string} />
          </Suspense>

          <Suspense fallback={<CardSkeleton title="成員人數" description="這個群組的成員人數。" />}>
            <MembersCard id={id as string} />
          </Suspense>

          <Suspense fallback={<CardSkeleton title="稽核資訊" description="這個群組的建立與更新時間。" skeletonClassName="h-8" />}> 
            <AuditInfoCard id={id as string} />
          </Suspense>
        </div>
      </main>
    </>
  );
}

function Header({ id }: { id: string }) {
  const { data } = useSuspenseQuery(GROUP_HEADER_QUERY, {
    variables: { id },
  });

  return <PageHeader title={`群組「${data.group.name}」`} description={data.group.description ?? "這個群組沒有描述。"} />;
}

function HeaderSkeleton() {
  return (
    <PageHeaderSkeleton description="這個群組的詳細資訊。" />
  );
}

function ScopeCard({ id }: { id: string }) {
  const { data } = useSuspenseQuery(GROUP_SCOPES_QUERY, {
    variables: { id },
  });

  const permissionsList = data.group.scopeSet?.map((scopeSet) => {
    return scopeSet.scopes.map((scope) => {
      return {
        scope,
        inheritFrom: scopeSet.slug,
      }
    })
  }).flat() ?? []
  
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
          {permissionsList.map((permission) => (
            <Tooltip key={permission.inheritFrom + "-" + permission.scope}>
              <TooltipTrigger>
                <Badge>
                  <code>{permission.scope}</code>
                </Badge>
              </TooltipTrigger>

              <TooltipContent>
                <p>繼承自 scope set：<code>{permission.inheritFrom}</code></p>
              </TooltipContent>
            </Tooltip>
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

function MembersCard({ id }: { id: string }) {
  const { data } = useSuspenseQuery(GROUP_MEMBERS_QUERY, {
    variables: { id },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>成員人數</CardTitle>
        <CardDescription>這個群組的成員人數。</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{data.users.totalCount}</p>
      </CardContent>
    </Card>
  )
}

function AuditInfoCard({ id }: { id: string }) {
  const { data } = useSuspenseQuery(GROUP_AUDIT_INFO_QUERY, {
    variables: { id },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>稽核資訊</CardTitle>
        <CardDescription>這個群組的建立與更新時間。</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="text-sm">
          <li className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>建立時間：{new Date(data.group.createdAt).toLocaleString()}</span>
          </li>
          <li className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>更新時間：{new Date(data.group.updatedAt).toLocaleString()}</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  )
}