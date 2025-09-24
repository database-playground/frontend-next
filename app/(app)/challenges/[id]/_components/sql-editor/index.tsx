import { graphql, readFragment, type FragmentType } from "@/gql";
import SQLEditor, { type SQLEditorProps } from "./editor";

export interface AutocompletedSQLEditorProps
  extends Omit<SQLEditorProps, "schema"> {
  structureFragment: FragmentType<typeof DATABASE_STRUCTURE>;
}

const DATABASE_STRUCTURE = graphql(`
  fragment DatabaseStructure on Database {
    id
    structure {
      tables {
        columns
        name
      }
    }
  }
`);

export function AutocompletedSQLEditor({
  structureFragment,
  ...sqlEditorProps
}: AutocompletedSQLEditorProps) {
  const structure = readFragment(DATABASE_STRUCTURE, structureFragment);
  const schema = structure.structure.tables.reduce((acc, table) => {
    acc[table.name] = table.columns;
    return acc;
  }, {} as Record<string, string[]>);

  return <SQLEditor schema={schema} {...sqlEditorProps} />;
}
