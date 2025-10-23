"use client";

import { useDebouncedValue } from "foxact/use-debounced-value";
import { Suspense, useState, useTransition } from "react";
import type { TagState } from "./filter/tag";

import QuestionCard from "@/components/question/question-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { graphql } from "@/gql";
import { QuestionDifficulty, type QuestionWhereInput } from "@/gql/graphql";
import { getQuestionSolvedStatus, type SolvedStatus } from "@/lib/solved-status";
import { useSuspenseQuery } from "@apollo/client/react";
import { useLocalStorage } from "foxact/use-local-storage";
import FilterSection from "./filter";

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

export default function QuestionsList() {
  const [search, setSearch] = useState<string>("");
  const [tags, setTags] = useLocalStorage<TagState>("question-list:tags", {
    solvedStatus: ["solved", "unsolved", "not-tried"],
    difficulty: [
      QuestionDifficulty.Easy,
      QuestionDifficulty.Medium,
      QuestionDifficulty.Hard,
      QuestionDifficulty.Unspecified,
    ],
    categories: [],
  });

  const deferredSearch = useDebouncedValue(search, 200);

  const where: QuestionWhereInput = {
    or: deferredSearch
      ? [
        {
          titleContainsFold: deferredSearch,
        },
        {
          descriptionContainsFold: deferredSearch,
        },
      ]
      : undefined,
    difficultyIn: tags.difficulty || undefined,
    categoryIn: tags.categories || undefined,
  };

  return (
    <div
      className={`
        flex w-full flex-col-reverse gap-4
        lg:flex-row
      `}
    >
      <FilterSection
        search={search}
        setSearch={setSearch}
        tags={tags}
        setTags={setTags}
      />
      <div className="flex-1">
        <Suspense fallback={<Skeleton className="h-48 w-full" />}>
          <ChallengeQuestionsList
            where={where}
            solvedStatusContains={tags.solvedStatus}
          />
        </Suspense>
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
  const [isPending, startTransition] = useTransition();
  const { data, fetchMore } = useSuspenseQuery(LIST_QUESTIONS, {
    variables: { where },
  });

  return (
    <div className="flex flex-col gap-4">
      {data?.questions.edges
        ?.filter(
          (question) =>
            question
            && question.node
            && solvedStatusContains.includes(
              getQuestionSolvedStatus(question.node),
            ),
        )
        .map((question) => {
          if (!question || !question.node) return null;
          return <QuestionCard key={question.node.id} fragment={question.node} />;
        })}

      {data?.questions.pageInfo.hasNextPage && (
        <div className="flex w-full justify-center">
          <Button
            disabled={isPending}
            onClick={() => {
              startTransition(() => {
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
                });
              });
            }}
          >
            載入更多
          </Button>
        </div>
      )}
    </div>
  );
}
