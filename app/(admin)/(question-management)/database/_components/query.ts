import { graphql } from "@/gql";

export const DATABASE_BY_ID_QUERY = graphql(`
  query DatabaseById($id: ID!) {
    database(id: $id) {
      id
      slug
      description
      schema
      relationFigure
    }
  }
`);

export const DATABASES_TABLE_QUERY = graphql(`
  query DatabasesTable {
    databases {
      id
      slug
      description
      schema
      relationFigure
    }
  }
`); 