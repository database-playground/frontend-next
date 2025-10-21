import { difficultyTranslation } from "@/components/question/difficulty-badge";
import { solvedStatusTranslation } from "@/components/question/solved-status-badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { graphql } from "@/gql";
import { QuestionDifficulty } from "@/gql/graphql";
import type { SolvedStatus } from "@/lib/solved-status";
import { useSuspenseQuery } from "@apollo/client/react";
import { FilterIcon } from "lucide-react";

export interface TagState {
  solvedStatus: SolvedStatus[];
  difficulty: QuestionDifficulty[];
  categories: string[];
}

export interface TagFilterSectionProps {
  value: TagState;
  onChange: (tags: TagState) => void;
}

const TAG_FILTER_SECTION_QUERY = graphql(`
  query TagFilterSection {
    questionCategories
  }
`);

export default function TagFilterSection({
  value,
  onChange,
}: TagFilterSectionProps) {
  const { data } = useSuspenseQuery(TAG_FILTER_SECTION_QUERY);

  const getSolvedStatus = (solvedStatus: SolvedStatus) => {
    return value.solvedStatus.includes(solvedStatus);
  };

  const getDifficulty = (difficulty: QuestionDifficulty) => {
    return value.difficulty.includes(difficulty);
  };

  const getCategory = (category: string) => {
    return value.categories.includes(category);
  };

  const handleDifficultyChange = (difficulty: QuestionDifficulty) => {
    return (checked: boolean) => {
      onChange({
        ...value,
        difficulty: checked
          ? [...value.difficulty, difficulty]
          : value.difficulty.filter((d) => d !== difficulty),
      });
    };
  };

  const handleSolvedStatusChange = (status: SolvedStatus) => {
    return (checked: boolean) => {
      onChange({
        ...value,
        solvedStatus: checked
          ? [...value.solvedStatus, status]
          : value.solvedStatus.filter((s) => s !== status),
      });
    };
  };

  const handleCategoryChange = (category: string) => {
    return (checked: boolean) => {
      onChange({
        ...value,
        categories: checked ? [...value.categories, category] : value.categories.filter((c) => c !== category),
      });
    };
  };

  return (
    <div className="space-y-3">
      <label className="flex items-center gap-2 font-bold">
        <FilterIcon className="size-4" />
        標籤
      </label>

      <div className="mb-4 space-y-2 text-sm text-muted-foreground">
        解題狀態
        <div className="mt-2 space-y-2">
          <TagCheckbox
            tag="solved"
            checked={getSolvedStatus("solved")}
            onChange={handleSolvedStatusChange("solved")}
            translation={solvedStatusTranslation}
          />
          <TagCheckbox
            tag="unsolved"
            checked={getSolvedStatus("unsolved")}
            onChange={handleSolvedStatusChange("unsolved")}
            translation={solvedStatusTranslation}
          />
          <TagCheckbox
            tag="not-tried"
            checked={getSolvedStatus("not-tried")}
            onChange={handleSolvedStatusChange("not-tried")}
            translation={solvedStatusTranslation}
          />
        </div>
      </div>

      <div className="mb-4 space-y-2 text-sm text-muted-foreground">
        難度
        <div className="mt-2 space-y-2">
          <TagCheckbox
            tag={QuestionDifficulty.Easy}
            checked={getDifficulty(QuestionDifficulty.Easy)}
            onChange={handleDifficultyChange(QuestionDifficulty.Easy)}
            translation={difficultyTranslation}
          />
          <TagCheckbox
            tag={QuestionDifficulty.Medium}
            checked={getDifficulty(QuestionDifficulty.Medium)}
            onChange={handleDifficultyChange(QuestionDifficulty.Medium)}
            translation={difficultyTranslation}
          />
          <TagCheckbox
            tag={QuestionDifficulty.Hard}
            checked={getDifficulty(QuestionDifficulty.Hard)}
            onChange={handleDifficultyChange(QuestionDifficulty.Hard)}
            translation={difficultyTranslation}
          />
          <TagCheckbox
            tag={QuestionDifficulty.Unspecified}
            checked={getDifficulty(QuestionDifficulty.Unspecified)}
            onChange={handleDifficultyChange(QuestionDifficulty.Unspecified)}
            translation={difficultyTranslation}
          />
        </div>
      </div>

      <div className="space-y-2 text-sm text-muted-foreground">
        分類
        <div className="mt-2 space-y-2">
          {data.questionCategories.map((category) => (
            <div key={category} className="flex items-center gap-2">
              <Checkbox
                id={category}
                checked={getCategory(category)}
                onCheckedChange={handleCategoryChange(category)}
              />
              <Label htmlFor={category}>{category}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TagCheckbox<T extends string>({
  tag,
  checked,
  onChange,
  translation,
}: {
  tag: T;
  checked: boolean;
  onChange: (checked: boolean) => void;
  translation: Record<T, string>;
}) {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id={tag} checked={checked} onCheckedChange={onChange} />
      <Label htmlFor={tag}>{translation[tag]}</Label>
    </div>
  );
}
