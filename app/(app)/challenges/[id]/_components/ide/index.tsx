"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { graphql } from "@/gql";
import { useMutation } from "@apollo/client/react";
import { Suspense, useState } from "react";
import { toast } from "sonner";
import { QUESTION_HEADER } from "../header";
import CompareAnswer, { COMPARE_ANSWER_QUERY } from "./compare-answer";
import CorrectAnswer from "./correct-answer";
import QuestionDescription from "./description";
import MyAnswer, { MY_ANSWER } from "./my-answer";
import { SQLEditor } from "./sql-editor";
import SubmissionHistory, { SUBMISSION_HISTORY } from "./submission-history";

export interface PracticeIDEProps {
  id: string;
}

const SUBMIT_ANSWER = graphql(`
  mutation SubmitAnswer($id: ID!, $answer: String!) {
    submitAnswer(id: $id, answer: $answer) {
      error
    }
  }
`);

export default function PracticeIDE({ id }: PracticeIDEProps) {
  const [activeTab, setActiveTab] = useState("my-answer");
  const [disabled, setDisabled] = useState(false);
  const [submitAnswer] = useMutation(SUBMIT_ANSWER, {
    refetchQueries: getRefetchQueries(activeTab),
    onCompleted(data) {
      toast.success("答案送出成功", {
        description: data.submitAnswer.error ? "不過答案可能有語法錯誤，請到「我的答案」查看。" : undefined,
      });
    },
    onError(error) {
      toast.error("無法送出答案", {
        description: error.message,
      });
    },
  });

  const handleSubmit = async (answer: string) => {
    const loading = toast.loading("正在送出答案");
    await submitAnswer({
      variables: {
        id,
        answer,
      },
    });
    toast.dismiss(loading);
  };

  return (
    <div
      className={`
        grid grid-cols-1 gap-6
        md:grid-cols-2
      `}
    >
      {/* Left */}
      <div className="space-y-6">
        <Suspense fallback={<Skeleton className="h-64" />}>
          {/* Description */}
          <QuestionDescription id={id} />

          {/* SQL Editor */}
          <SQLEditor
            id={id}
            disabled={disabled}
            onSubmit={handleSubmit}
            onHint={(hint) => {
              toast.info("hint", {
                description: hint,
              });

              setDisabled(true);
              setTimeout(() => {
                setDisabled(false);
              }, 1000);
            }}
          />
        </Suspense>
      </div>

      {/* Answer Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={(value) => {
          setActiveTab(value);
        }}
      >
        <TabsList>
          <TabsTrigger value="my-answer">我的答案</TabsTrigger>
          <TabsTrigger value="correct-answer">正確答案</TabsTrigger>
          <TabsTrigger value="compare-answer">比較答案</TabsTrigger>
          <TabsTrigger value="submission-history">提交記錄</TabsTrigger>
        </TabsList>
        <TabsContent value="my-answer">
          <Suspense fallback={<Skeleton className="h-48" />}>
            <MyAnswer id={id} />
          </Suspense>
        </TabsContent>
        <TabsContent value="correct-answer">
          <Suspense fallback={<Skeleton className="h-48" />}>
            <CorrectAnswer id={id} />
          </Suspense>
        </TabsContent>
        <TabsContent value="compare-answer">
          <Suspense fallback={<Skeleton className="h-48" />}>
            <CompareAnswer id={id} />
          </Suspense>
        </TabsContent>
        <TabsContent value="submission-history">
          <Suspense fallback={<Skeleton className="h-48" />}>
            <SubmissionHistory id={id} />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function getRefetchQueries(activeTab: string) {
  const baseQueries = [QUESTION_HEADER];

  switch (activeTab) {
    case "my-answer":
      return [MY_ANSWER, ...baseQueries];
    case "correct-answer":
      return baseQueries;
    case "compare-answer":
      return [COMPARE_ANSWER_QUERY, ...baseQueries];
    case "submission-history":
      return [SUBMISSION_HISTORY, ...baseQueries];
  }
}
