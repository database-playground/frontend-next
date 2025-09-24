import { Badge } from "@/components/ui/badge";
import { type FragmentType, graphql, readFragment } from "@/gql";
import { getQuestionSolvedStatus } from "@/lib/solved-status";
import { SwordIcon } from "lucide-react";
import Link from "next/link";
import DifficultyBadge from "./difficulty-badge";
import SolvedStatusBadge from "./solved-status-badge";

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

export default function QuestionCard({
  fragment,
}: {
  fragment: FragmentType<typeof QUESTION_CARD_FRAGMENT>;
}) {
  const question = readFragment(QUESTION_CARD_FRAGMENT, fragment);
  const descriptionFirstLine = question.description.split("\n")[0];
  const solvedStatus = getQuestionSolvedStatus(question);

  return (
    <article className="flex overflow-hidden rounded">
      {/* Question Body */}
      <div className="flex-1 space-y-3 bg-white p-4">
        <div>
          <h2 className="font-bold tracking-wider">{question.title}</h2>
          <p className="tracking-wide">{descriptionFirstLine}</p>
        </div>
        <div className="flex flex-wrap gap-1">
          <SolvedStatusBadge solvedStatus={solvedStatus} />
          <DifficultyBadge difficulty={question.difficulty} />
          <Badge>{question.category}</Badge>
        </div>
      </div>

      {/* Operation Button */}
      <OperationButton href={`/challenges/${question.id}`} />
    </article>
  );
}

function OperationButton({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className={`
        flex flex-col items-center justify-center gap-2.5 bg-gray-100 p-2
        transition-all duration-300
        hover:bg-primary hover:text-white
      `}
    >
      <SwordIcon className="size-4" />
      練習
    </Link>
  );
}
