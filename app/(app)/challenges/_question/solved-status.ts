import { type FragmentType, graphql, readFragment } from "@/gql";
import type { SolvedStatus } from "../model";

export const QUESTION_SOLVED_STATUS_FRAGMENT = graphql(`
    fragment QuestionSolvedStatus on Question {
        solved
        attempted
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
