"use client";

import { graphql } from "@/gql";
import { AutocompletedSQLEditor } from "./sql-editor";
import { useSuspenseQuery } from "@apollo/client/react";
import { useState } from "react";
import { toast } from "sonner";

export interface PracticeIDEProps {
  id: string;
}

export const QUESTION_DATABASE = graphql(`
  query QuestionDatabase($id: ID!) {
    question(id: $id) {
      id
      database {
        id
      }
    }
  }
`);

export default function PracticeIDE({ id }: PracticeIDEProps) {
    const [disabled, setDisabled] = useState(false);
  const { data } = useSuspenseQuery(QUESTION_DATABASE, {
    variables: { id },
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <AutocompletedSQLEditor
        disabled={disabled}
        databaseId={data.question.database.id}
        onSubmit={(answer) => {
            toast.info("question submitted", {
                description: answer,
            })

            setDisabled(true);
            setTimeout(() => {
                setDisabled(false);
            }, 1000);
        }}
        onHint={(hint) => {
            toast.info("hint", {
                description: hint,
            })

            setDisabled(true);
            setTimeout(() => {
                setDisabled(false);
            }, 1000);
        }}
      />
    </div>
  );
}
