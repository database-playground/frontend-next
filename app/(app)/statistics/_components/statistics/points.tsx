"use client";

import { type FragmentType, graphql, readFragment } from "@/gql";
import { useSuspenseQuery } from "@apollo/client/react";

const POINTS = graphql(`
  query Points {
    me {
      id
      totalPoints

      points(first: 5, orderBy: { field: GRANTED_AT, direction: DESC }) {
        edges {
          node {
            id
            ...PointFragment
          }
        }
      }
    }
  }
`);

const POINT_FRAGMENT = graphql(`
  fragment PointFragment on Point {
    description
    points
  }
`);

export default function Points() {
  const { data } = useSuspenseQuery(POINTS);
  const totalPoints = data.me.totalPoints;

  return (
    <section>
      <div className="mb-1 text-2xl font-bold text-primary">
        {totalPoints} 點
      </div>
      <ul className="flex list-inside list-disc flex-col gap-1">
        {data.me.points.edges?.map(
          (edge) => edge?.node && <PointHistoryLine key={edge.node.id} fragment={edge.node} />,
        )}
      </ul>
    </section>
  );
}

function PointHistoryLine({
  fragment,
}: {
  fragment: FragmentType<typeof POINT_FRAGMENT>;
}) {
  const point = readFragment(POINT_FRAGMENT, fragment);
  const symbol = point.points > 0 ? "+" : "-";

  return (
    <li>
      {point.description} ({symbol}
      {Math.abs(point.points)})
    </li>
  );
}
