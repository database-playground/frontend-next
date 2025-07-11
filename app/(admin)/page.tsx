import { DataTableSkeleton } from "@/components/data-table/skeleton";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader title="概覽" />
      <main className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <DataTableSkeleton />
      </main>
    </>
  );
}
