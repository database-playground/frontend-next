import { graphql } from "@/gql";

export const DATABASE_DETAIL_QUERY = graphql(`
  query DatabaseDetail($id: ID!) {
    database(id: $id) {
      id
      slug
      description
      schema
      relationFigure
    }
  }
`); 