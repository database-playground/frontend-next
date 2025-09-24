import { graphql } from "@/gql";
import { useSuspenseQuery } from "@apollo/client/react";
import { AutocompletedSQLEditor } from "../sql-editor";

const SQL_EDITOR_CONTEXT = graphql(`
  query SqlEditorContext($id: ID!) {
    question(id: $id) {
      id
      database {
        id
        ...DatabaseStructure
      }
      lastSubmission {
        id
        submittedCode
      }
    }
  }
`);

interface SQLEditorProps {
  id: string;
  disabled: boolean;
  onSubmit: (value: string) => void;
  onHint: (value: string) => void;
}

export function SQLEditor({
  id,
  disabled,
  onSubmit,
  onHint,
}: SQLEditorProps) {
  const { data } = useSuspenseQuery(SQL_EDITOR_CONTEXT, {
    variables: { id },
  });
  const { database, lastSubmission } = data.question;

  return (
    <AutocompletedSQLEditor
      defaultValue={lastSubmission?.submittedCode}
      disabled={disabled}
      structureFragment={database}
      onSubmit={onSubmit}
      onHint={onHint}
    />
  );
}
