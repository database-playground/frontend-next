import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { type FragmentType, graphql, readFragment } from "@/gql";
import { useLazyQuery } from "@apollo/client/react";
import { Database, Download } from "lucide-react";
import { Remark } from "react-remark";
import { toast } from "sonner";

const MATERIAL_SCHEMA_CARD = graphql(`
  fragment MaterialsSchemaCard on Database {
    id
    slug
    description
  }
`);

const MATERIAL_SCHEMA_CONTENT_QUERY = graphql(`
  query MaterialsSchemaContent($id: ID!) {
    database(id: $id) {
      id
      schema
    }
  }
`);

export function MaterialsSchemaCard({
  fragment,
}: {
  fragment: FragmentType<typeof MATERIAL_SCHEMA_CARD>;
}) {
  const { id, slug, description } = readFragment(
    MATERIAL_SCHEMA_CARD,
    fragment,
  );
  const [getSchemaContent] = useLazyQuery(MATERIAL_SCHEMA_CONTENT_QUERY);

  const handleDownload = async () => {
    const loading = toast.loading("正在下載 SQL 檔案……");

    try {
      const { data } = await getSchemaContent({ variables: { id } });
      if (!data) return;

      const blob = new Blob([data.database.schema], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `schema-${slug}.sql`;
      a.click();
      URL.revokeObjectURL(url);

      toast.success("成功下載 SQL 檔案", { description: `schema-${slug}.sql` });
    } catch (error) {
      toast.error("無法下載 SQL 檔案", {
        description: error instanceof Error ? error.message : undefined,
      });
    } finally {
      toast.dismiss(loading);
    }
  };

  return (
    <Card
      className={`
        flex flex-col
        hover:border-primary/50 hover:shadow-lg
      `}
    >
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="w-fit rounded-lg bg-primary/10 p-2 text-primary">
            <Database className="h-5 w-5" />
          </div>
        </div>
        <div className="space-y-1.5">
          <CardTitle className="text-xl">{slug}</CardTitle>

          {description
            ? (
              <CardDescription className="prose text-sm text-foreground">
                <Remark>{description}</Remark>
              </CardDescription>
            )
            : null}
        </div>
      </CardHeader>
      <CardFooter className="pt-0">
        <Button
          onClick={handleDownload}
          className="group/btn w-full"
          variant="default"
        >
          <Download className="mr-2 h-4 w-4" />
          下載 SQL 檔案
        </Button>
      </CardFooter>
    </Card>
  );
}
