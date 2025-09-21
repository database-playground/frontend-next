"use client";

import { useState } from "react";
import type { TagState } from "./_filter/tag";

import { QuestionDifficulty, type QuestionWhereInput } from "@/gql/graphql";
import FilterSection from "./_filter";
import QuestionCard from "./_question";
import { useSuspenseQuery } from "@apollo/client/react";
import type { SolvedStatus } from "./model";
import { Button } from "@/components/ui/button";
import { graphql } from "@/gql";
import { getQuestionSolvedStatus } from "./_question/solved-status";

export const LIST_QUESTIONS = graphql(`
  query ListQuestions($where: QuestionWhereInput, $after: Cursor) {
    questions(where: $where, first: 10, after: $after) {
      edges {
        node {
          id
          ...QuestionCard
          ...QuestionSolvedStatus
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`);

export default function ChallengePageContent() {
  const [search, setSearch] = useState<string>("");
  const [tags, setTags] = useState<TagState>({
    solvedStatus: ["solved", "unsolved", "not-tried"],
    difficulty: [
      QuestionDifficulty.Easy,
      QuestionDifficulty.Medium,
      QuestionDifficulty.Hard,
      QuestionDifficulty.Unspecified,
    ],
  });

  const where: QuestionWhereInput = {
    titleContainsFold: search,
    difficultyIn: tags.difficulty,
  };

  return (
    <div className="flex gap-4 w-full">
      <FilterSection
        search={search}
        setSearch={setSearch}
        tags={tags}
        setTags={setTags}
      />
      <div className="flex-1">
        <ChallengeQuestionsList
          where={where}
          solvedStatusContains={tags.solvedStatus}
        />
      </div>
    </div>
  );
}

export function ChallengeQuestionsList({
  where,
  solvedStatusContains,
}: {
  where: QuestionWhereInput;
  solvedStatusContains: SolvedStatus[];
}) {
  const { data, fetchMore } = useSuspenseQuery(LIST_QUESTIONS, {
    variables: { where },
  });

  return (
    <div>
      {data?.questions.edges
        ?.filter(
          (question) =>
            question &&
            question.node &&
            solvedStatusContains.includes(
              getQuestionSolvedStatus(question.node)
            )
        )
        .map((question) => {
          if (!question || !question.node) return null;
          return (
            <QuestionCard key={question.node.id} fragment={question.node} />
          );
        })}

      {data?.questions.pageInfo.hasNextPage && (
        <Button
          onClick={() =>
            fetchMore({
              variables: {
                after: data?.questions.pageInfo.endCursor,
              },
              updateQuery(previousQueryResult, options) {
                return {
                  questions: {
                    edges: [
                      ...(previousQueryResult.questions.edges || []),
                      ...(options.fetchMoreResult.questions.edges || []),
                    ],
                    pageInfo: options.fetchMoreResult.questions.pageInfo,
                  },
                };
              },
            })
          }
        >
          載入更多
        </Button>
      )}
    </div>
  );
}
