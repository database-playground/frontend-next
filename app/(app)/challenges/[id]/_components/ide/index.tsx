"use client";

import { graphql } from "@/gql";
import { useSuspenseQuery } from "@apollo/client/react";
import { Suspense, useState } from "react";
import { toast } from "sonner";
import { SQLEditor } from "./sql-editor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import CorrectAnswer from "./correct-answer";
import QuestionDescription from "./description";

export interface PracticeIDEProps {
  id: string;
}

export default function PracticeIDE({ id }: PracticeIDEProps) {
  const [disabled, setDisabled] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left */}
      <div className="space-y-6">
        <Suspense fallback={<Skeleton className="h-64" />}>
          {/* Description */}
          <QuestionDescription id={id} />

          {/* SQL Editor */}
          <SQLEditor
            id={id}
            disabled={disabled}
            onSubmit={(answer) => {
              toast.info("question submitted", {
                description: answer,
              });

              setDisabled(true);
              setTimeout(() => {
                setDisabled(false);
              }, 1000);
            }}
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
      <Tabs defaultValue="correct-answer">
        <TabsList>
          <TabsTrigger value="correct-answer">正確答案</TabsTrigger>
          <TabsTrigger value="your-answer">你的答案</TabsTrigger>
        </TabsList>
        <TabsContent value="correct-answer">
          <Suspense fallback={<Skeleton className="h-48" />}>
            <CorrectAnswer id={id} />
          </Suspense>
        </TabsContent>
        <TabsContent value="your-answer">
          <p>WIP</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
