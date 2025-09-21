import { Badge } from "@/components/ui/badge";
import { QuestionDifficulty } from "@/gql/graphql";
import { SwordIcon } from "lucide-react";
import Link from "next/link";
import {
  difficultyTranslation,
  solvedStatusTranslation,
  type SolvedStatus,
} from "../model";
import { graphql, readFragment, type FragmentType } from "@/gql";
import { getQuestionSolvedStatus } from "./solved-status";

const QUESTION_CARD_FRAGMENT = graphql(`
  fragment QuestionCard on Question {
    id
    title
    description
    difficulty
    category

    ...QuestionSolvedStatus
  }
`);

const solvedStatusColor: Record<SolvedStatus, string> = {
  solved: "bg-green-800",
  unsolved: "bg-yellow-800",
  "not-tried": "bg-gray-800",
};

const badgeColor: Record<QuestionDifficulty, string> = {
  [QuestionDifficulty.Easy]: "bg-green-800",
  [QuestionDifficulty.Medium]: "bg-yellow-800",
  [QuestionDifficulty.Hard]: "bg-red-800",
  [QuestionDifficulty.Unspecified]: "bg-gray-800",
};

export default function QuestionCard({
  fragment,
}: {
  fragment: FragmentType<typeof QUESTION_CARD_FRAGMENT>;
}) {
  const question = readFragment(QUESTION_CARD_FRAGMENT, fragment);
  const descriptionFirstLine = question.description.split("\n")[0];
  const solvedStatus = getQuestionSolvedStatus(question);

  return (
    <div className="flex rounded overflow-hidden">
      {/* Question Body */}
      <div className="space-y-3 bg-white p-4 flex-1">
        <div>
          <h2 className="font-bold tracking-wider">{question.title}</h2>
          <p className="tracking-wide">{descriptionFirstLine}</p>
        </div>
        <div className="flex flex-wrap gap-1">
          <Badge className={solvedStatusColor[solvedStatus]}>
            {solvedStatusTranslation[solvedStatus]}
          </Badge>
          <Badge className={badgeColor[question.difficulty]}>
            {difficultyTranslation[question.difficulty]}
          </Badge>
          <Badge>{question.category}</Badge>
        </div>
      </div>

      {/* Operation Button */}
      <OperationButton href={`/challenges/${question.id}`} />
    </div>
  );
}

function OperationButton({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="bg-gray-100 hover:bg-primary hover:text-white transition-all duration-300 p-2 flex flex-col justify-center items-center gap-2.5"
    >
      <SwordIcon className="size-4" />
      練習
    </Link>
  );
}
