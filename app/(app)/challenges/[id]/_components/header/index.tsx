"use client";

import ColoredRate from "@/components/colored-rate";
import DifficultyBadge from "@/components/question/difficulty-badge";
import SolvedStatusBadge from "@/components/question/solved-status-badge";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { graphql } from "@/gql";
import { getQuestionSolvedStatus } from "@/lib/solved-status";
import { useSuspenseQuery } from "@apollo/client/react";

export const QUESTION_HEADER = graphql(`
  query QuestionHeader($id: ID!) {
    question(id: $id) {
      id
      title
      difficulty
      category

      statistics {
        passedUsers
        attemptedUsers
        correctSubmissionCount
        submissionCount
      }

      ...QuestionSolvedStatus
    }
  }
`);

export default function Header({ id }: { id: string }) {
  const { data } = useSuspenseQuery(QUESTION_HEADER, { variables: { id } });
  const { title, difficulty, category, statistics } = data.question;

  const passedRate = statistics.attemptedUsers ? statistics.passedUsers / statistics.attemptedUsers : 0;
  const correctSubmissionRate = statistics.submissionCount
    ? statistics.correctSubmissionCount / statistics.submissionCount
    : 0;

  const solvedStatus = getQuestionSolvedStatus(data.question);

  return (
    <div>
      {/* Header */}
      <header className="mb-6 flex items-center gap-6">
        <div className="text-xl leading-none font-bold tracking-wide">
          {title}
        </div>
        <Separator />
        <div className="flex items-center gap-2">
          <Badge>{category}</Badge>
          <DifficultyBadge difficulty={difficulty} />
          <SolvedStatusBadge solvedStatus={solvedStatus} />
        </div>
        <Separator />
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger>
              <span className="text-sm text-muted-foreground">
                通過率 <ColoredRate rate={passedRate} />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              共有 {statistics.attemptedUsers} 人嘗試這題，其中 {statistics.passedUsers} 人通過。
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <span className="text-sm text-muted-foreground">
                正確率 <ColoredRate rate={correctSubmissionRate} />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              共有 {statistics.submissionCount} 次提交，其中 {statistics.correctSubmissionCount} 次正確。
            </TooltipContent>
          </Tooltip>
        </div>
      </header>
    </div>
  );
}

function Separator() {
  return <div className="h-4 w-px bg-border" />;
}
