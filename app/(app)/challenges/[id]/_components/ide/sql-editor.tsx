import { graphql, readFragment, type FragmentType } from "@/gql";
import { AutocompletedSQLEditor } from "../sql-editor";

const SQL_EDITOR_CONTEXT = graphql(`
  fragment SqlEditorContext on Question {
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
`);

interface SQLEditorProps {
  contextFragment: FragmentType<typeof SQL_EDITOR_CONTEXT>;
  disabled: boolean;
  onSubmit: (value: string) => void;
  onHint: (value: string) => void;
}

export function SQLEditor({ contextFragment, disabled, onSubmit, onHint }: SQLEditorProps) {
  const { database, lastSubmission } = readFragment(SQL_EDITOR_CONTEXT, contextFragment);

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
