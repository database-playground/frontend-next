import { type FragmentType, graphql, readFragment } from "@/gql";

export type SolvedStatus = "solved" | "unsolved" | "not-tried";

export const QUESTION_SOLVED_STATUS_FRAGMENT = graphql(`
    fragment QuestionSolvedStatus on Question {
        id
        attempted
        solved
    }
`);

export function getQuestionSolvedStatus(
  fragment: FragmentType<typeof QUESTION_SOLVED_STATUS_FRAGMENT>,
): SolvedStatus {
  const question = readFragment(QUESTION_SOLVED_STATUS_FRAGMENT, fragment);

  if (question.solved) {
    return "solved";
  }

  if (question.attempted && !question.solved) {
    return "unsolved";
  }

  return "not-tried";
}
