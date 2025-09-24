import SQLEditor, { type SQLEditorProps } from "./editor";

import { useDatabaseSchema } from "./schema";

export interface AutocompletedSQLEditorProps extends Omit<SQLEditorProps, "schema"> {
  databaseId: string;
}

export function AutocompletedSQLEditor({
  databaseId,
  ...sqlEditorProps
}: AutocompletedSQLEditorProps) {
  const schema = useDatabaseSchema(databaseId);

  return <SQLEditor schema={schema} {...sqlEditorProps} />;
}
