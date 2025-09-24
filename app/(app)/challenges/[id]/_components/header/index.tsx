"use client";

import DifficultyBadge from "@/components/question/difficulty-badge";
import SolvedStatusBadge from "@/components/question/solved-status-badge";
import { Badge } from "@/components/ui/badge";
import { graphql } from "@/gql";
import { getQuestionSolvedStatus } from "@/lib/solved-status";
import { useSuspenseQuery } from "@apollo/client/react";
import { Remark } from "react-remark";

const QUESTION_HEADER = graphql(`
  query QuestionHeader($id: ID!) {
    question(id: $id) {
      id
      title
      description
      difficulty
      category

      ...QuestionSolvedStatus
    }
  }
`);

export default function Header({ id }: { id: string }) {
  const { data } = useSuspenseQuery(QUESTION_HEADER, { variables: { id } });
  const { title, difficulty, category, description } = data.question;

  const solvedStatus = getQuestionSolvedStatus(data.question);

  return (
    <div>
      {/* Header */}
      <header className="mb-6 flex items-center gap-6">
        <div className="text-xl font-bold leading-none tracking-wide">{title}</div>
        <div className="h-4 w-px bg-border" />
        <div className="flex items-center gap-2">
          <Badge>{category}</Badge>
          <DifficultyBadge difficulty={difficulty} />
          <SolvedStatusBadge solvedStatus={solvedStatus} />
        </div>
      </header>

      {/* Description */}
      <div className="prose text-foreground leading-5 tracking-wide">
        <Remark>{description}</Remark>
      </div>
    </div>
  );
}
