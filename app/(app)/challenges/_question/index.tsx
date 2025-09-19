import { Badge } from "@/components/ui/badge";
import { QuestionDifficulty } from "@/gql/graphql";
import { PencilIcon, SwordIcon } from "lucide-react";
import Link from "next/link";

export type SolveStatus = "solved" | "unsolved" | "not-tried";

export interface QuestionCardProps {
  id: number;
  title: string;
  description: string;

  // tags
  difficulty: QuestionDifficulty;
  category: string;
  solveStatus: SolveStatus;
}

const badgeColor: Record<QuestionDifficulty, string> = {
  [QuestionDifficulty.Easy]: "bg-green-800",
  [QuestionDifficulty.Medium]: "bg-yellow-800",
  [QuestionDifficulty.Hard]: "bg-red-800",
  [QuestionDifficulty.Unspecified]: "bg-gray-800",
};

const difficultyTranslation: Record<QuestionDifficulty, string> = {
  [QuestionDifficulty.Easy]: "簡單",
  [QuestionDifficulty.Medium]: "中等",
  [QuestionDifficulty.Hard]: "困難",
  [QuestionDifficulty.Unspecified]: "未指定",
};

export default function QuestionCard({
  id,
  title,
  description,
  difficulty,
  category,
  solveStatus,
}: QuestionCardProps) {
  const descriptionFirstLine = description.split("\n")[0];

  return (
    <div className="flex rounded overflow-hidden">
      {/* Question Body */}
      <div className="space-y-3 bg-white p-4 flex-1">
        <div>
          <h2 className="font-bold tracking-wider">{title}</h2>
          <p className="tracking-wide">{descriptionFirstLine}</p>
        </div>
        <div className="flex flex-wrap gap-1">
          <SolveStatusBadge solveStatus={solveStatus} />
          <Badge className={badgeColor[difficulty]}>
            {difficultyTranslation[difficulty]}
          </Badge>
          <Badge>{category}</Badge>
        </div>
      </div>

      {/* Operation Button */}
      <OperationButton href={`/challenges/${id}`} />
    </div>
  );
}

function SolveStatusBadge({ solveStatus }: { solveStatus: SolveStatus }) {
  switch (solveStatus) {
    case "solved":
      return <Badge className="bg-green-800">✅ 已經攻克</Badge>;
    case "unsolved":
      return <Badge className="bg-yellow-800">尚未攻克</Badge>;
    case "not-tried":
      return <Badge className="bg-gray-800">還沒嘗試</Badge>;
  }
}

function OperationButton({ href }: { href: string }) {
  return (
    <Link href={href} className="bg-gray-100 hover:bg-primary hover:text-white transition-all duration-300 p-2 flex flex-col justify-center items-center gap-2.5">
      <SwordIcon className="size-4" />
      練習
    </Link>
  );
}
