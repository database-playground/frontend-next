import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { AuditInfoCard } from "./_components/audit-info-card";
import { Header } from "./_components/header";
import { MembersCard } from "./_components/members-card";
import { ScopeCard } from "./_components/scope-card";

export default async function GroupPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

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
          <Header id={id as string} />

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
          <ScopeCard id={id as string} />
          <MembersCard id={id as string} />
          <AuditInfoCard id={id as string} />
        </div>
      </main>
    </>
  );
}
