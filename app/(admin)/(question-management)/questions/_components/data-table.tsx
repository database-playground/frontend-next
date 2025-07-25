"use client";

import { useSuspenseQuery } from "@apollo/client";
import { QUESTIONS_TABLE_QUERY } from "./query";
import { useState } from "react";
import type { Direction } from "@/components/data-table/pagination";
import { CursorDataTable } from "@/components/data-table/cursor";
import { columns, type Question } from "./data-table-columns";

export function QuestionsDataTable() {
  const PAGE_SIZE = 5;
  const [after, setAfter] = useState<string | null>(null);
  const [before, setBefore] = useState<string | null>(null);
  const [direction, setDirection] = useState<Direction>("backward");

  const variables = direction === "backward"
    ? { first: PAGE_SIZE, after, last: undefined, before: undefined }
    : { last: PAGE_SIZE, before, first: undefined, after: undefined };

  const { data } = useSuspenseQuery(QUESTIONS_TABLE_QUERY, {
    variables,
  });

  const questionList = data?.questions.edges
    ?.map((edge) => {
      const question = edge?.node;
      if (!question) return null;
      return {
        id: question.id,
        title: question.title,
        description: question.description,
        category: question.category,
        difficulty: question.difficulty as "easy" | "medium" | "hard" | "unspecified",
        referenceAnswer: question.referenceAnswer,
        database: question.database ? [question.database] : [], // Convert single database to array for table display
      } satisfies Question;
    })
    .filter((question) => question !== null) ?? [];

  const pageInfo = data?.questions.pageInfo;

  const handlePageChange = (direction: Direction) => {
    if (!pageInfo) return;
    if (direction === "forward" && pageInfo.hasNextPage) {
      setAfter(pageInfo.endCursor ?? null);
      setBefore(null);
      setDirection("forward");
    } else if (direction === "backward" && pageInfo.hasPreviousPage) {
      setBefore(pageInfo.startCursor ?? null);
      setAfter(null);
      setDirection("backward");
    }
  };

  return (
    <CursorDataTable
      columns={columns}
      data={questionList}
      totalCount={data?.questions.totalCount ?? 0}
      hasNextPage={!!pageInfo?.hasNextPage}
      hasPreviousPage={!!pageInfo?.hasPreviousPage}
      onPageChange={handlePageChange}
    />
  );
} 