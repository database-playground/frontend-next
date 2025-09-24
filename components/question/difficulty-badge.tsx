import { QuestionDifficulty } from "@/gql/graphql";
import { Badge } from "../ui/badge";

const badgeColor: Record<QuestionDifficulty, string> = {
  [QuestionDifficulty.Easy]: "bg-green-800",
  [QuestionDifficulty.Medium]: "bg-yellow-800",
  [QuestionDifficulty.Hard]: "bg-red-800",
  [QuestionDifficulty.Unspecified]: "bg-gray-800",
};

export const difficultyTranslation: Record<QuestionDifficulty, string> = {
  [QuestionDifficulty.Easy]: "簡單",
  [QuestionDifficulty.Medium]: "中等",
  [QuestionDifficulty.Hard]: "困難",
  [QuestionDifficulty.Unspecified]: "未指定",
};

export default function DifficultyBadge({
  difficulty,
}: {
  difficulty: QuestionDifficulty;
}) {
  return (
    <Badge className={badgeColor[difficulty]}>
      {difficultyTranslation[difficulty]}
    </Badge>
  );
}
