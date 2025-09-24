import { graphql } from "@/gql";
import { useSuspenseQuery } from "@apollo/client/react";

const DATABASE_STRUCTURE = graphql(`
    query DatabaseStructure($id: ID!) {
        database(id: $id) {
            id
            structure {
                tables {
                    columns
                    name
                }
            }
        }
    }
`)

export function useDatabaseSchema(id: string): Record<string, string[]> {
    const { data } = useSuspenseQuery(DATABASE_STRUCTURE, {
        variables: {
            id,
        },
    })

    return data.database.structure.tables.reduce((acc, table) => {
        acc[table.name] = table.columns
        return acc
    }, {} as Record<string, string[]>)
}
