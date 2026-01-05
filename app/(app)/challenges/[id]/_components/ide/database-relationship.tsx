import { graphql } from "@/gql";
import { useSuspenseQuery } from "@apollo/client/react";
import Image from "next/image";

export const DATABASE_RELATIONSHIP = graphql(`
  query DatabaseRelationship($id: ID!) {
    question(id: $id) {
      id
      database {
        id
        relationFigure
        slug
      }
    }
  }
`);

export default function DatabaseRelationship({ id }: { id: string }) {
  const { data } = useSuspenseQuery(DATABASE_RELATIONSHIP, {
    variables: { id },
  });
  const { slug, relationFigure } = data.question.database;

  return (
    <figure className="relative space-y-2" onContextMenu={(event) => event.preventDefault()}>
      {/* fixme: width and height are currently forced to 4:3 */}
      <Image
        unoptimized
        src={relationFigure}
        width={400}
        height={300}
        alt={`Database relationship diagram for ${slug}`}
        className="w-full rounded drag-none"
      />
      <figcaption className="text-sm text-gray-500 drag-none">
        資料庫「{slug}」關聯圖
      </figcaption>
    </figure>
  );
}
