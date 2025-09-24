"use client";

import { graphql } from "@/gql";
import { useSuspenseQuery } from "@apollo/client/react";
import { useState } from "react";
import { toast } from "sonner";
import { SQLEditor } from "./sql-editor";

export interface PracticeIDEProps {
  id: string;
}

const PRACTICE_IDE_CONTEXT = graphql(`
  query PracticeIdeContext($id: ID!) {
    question(id: $id) {
      id
      ...SqlEditorContext
    }
  }
`);

export default function PracticeIDE({ id }: PracticeIDEProps) {
  const [disabled, setDisabled] = useState(false);
  const { data: questionDatabaseData } = useSuspenseQuery(PRACTICE_IDE_CONTEXT, {
    variables: { id },
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <SQLEditor
        contextFragment={questionDatabaseData.question}
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
    </div>
  );
}
