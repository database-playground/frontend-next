import { QuestionDifficulty } from "@/gql/graphql";

/**
 * 解題狀態
 */
export type SolvedStatus = "solved" | "unsolved" | "not-tried";

/**
 * 難度
 */
export type Difficulty = QuestionDifficulty;

export const solvedStatusTranslation: Record<SolvedStatus, string> = {
    solved: "✅ 已經解決",
    unsolved: "尚未解決",
    "not-tried": "還沒嘗試",
};

export const difficultyTranslation: Record<Difficulty, string> = {
    [QuestionDifficulty.Easy]: "簡單",
    [QuestionDifficulty.Medium]: "中等",
    [QuestionDifficulty.Hard]: "困難",
    [QuestionDifficulty.Unspecified]: "未指定",
};
