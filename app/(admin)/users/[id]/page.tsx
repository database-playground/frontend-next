"use client";

import AppAvatar from "@/components/avatar";
import PageHeader, { PageHeaderSkeleton } from "@/components/page-header";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StyledLink } from "@/components/ui/link";
import { Skeleton } from "@/components/ui/skeleton";
import { graphql } from "@/gql";
import { cn } from "@/lib/utils";
import { useSuspenseQuery } from "@apollo/client";
import { Clock, Pencil, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { Suspense } from "react";

const USER_HEADER_QUERY = graphql(`
  query UserHeaderQuery($id: ID!) {
    user(id: $id) {
      id
      name
      email
      avatar
    }
  }
`);

const USER_GROUP_QUERY = graphql(`
  query UserGroupsQuery($id: ID!) {
    user(id: $id) {
      id
      group {
        id
        name
      }
    }
  }
`);

const USER_AUDIT_INFO_QUERY = graphql(`
  query UserAuditInfoQuery($id: ID!) {
    user(id: $id) {
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
      <SiteHeader title="使用者資訊" hasBackButton />
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
        <div
          className={`
            grid grid-cols-1 gap-4
            lg:grid-cols-2
          `}
        >
          <Suspense
            fallback={
              <CardSkeleton
                title="權限列表"
                description="這個群組擁有的權限。"
              />
            }
          >
            <GroupsCard id={id as string} />
          </Suspense>

          <Suspense
            fallback={
              <CardSkeleton
                title="稽核資訊"
                description="這個使用者的建立與更新時間。"
                skeletonClassName="h-8"
              />
            }
          >
            <AuditInfoCard id={id as string} />
          </Suspense>
        </div>
      </main>
    </>
  );
}

function Header({ id }: { id: string }) {
  const { data } = useSuspenseQuery(USER_HEADER_QUERY, {
    variables: { id },
  });

  return (
    <div className="flex items-center gap-4">
      <AppAvatar
        src={data.user.avatar}
        name={data.user.name}
        className="h-12 w-12"
      />
      <PageHeader
        title={`使用者「${data.user.name}」`}
        description={data.user.email}
      />
    </div>
  );
}

function HeaderSkeleton() {
  return <PageHeaderSkeleton description="這個使用者的詳細資訊。" />;
}

function GroupsCard({ id }: { id: string }) {
  const { data } = useSuspenseQuery(USER_GROUP_QUERY, {
    variables: { id },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>所屬群組</CardTitle>
        <CardDescription>這個使用者所屬的群組。</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{data.user.group?.name}</p>
        <p className="text-sm text-muted-foreground">
          <StyledLink href={`/groups/${data.user.group?.id}`}>詳細資訊和權限 →</StyledLink>
        </p>
      </CardContent>
    </Card>
  );
}

function CardSkeleton({
  title,
  description,
  skeletonClassName,
}: {
  title: string;
  description: string;
  skeletonClassName?: string;
}) {
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
  );
}

function AuditInfoCard({ id }: { id: string }) {
  const { data } = useSuspenseQuery(USER_AUDIT_INFO_QUERY, {
    variables: { id },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>稽核資訊</CardTitle>
        <CardDescription>這個使用者的建立與更新時間。</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="text-sm">
          <li className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>建立時間：{new Date(data.user.createdAt).toLocaleString()}</span>
          </li>
          <li className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>更新時間：{new Date(data.user.updatedAt).toLocaleString()}</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
