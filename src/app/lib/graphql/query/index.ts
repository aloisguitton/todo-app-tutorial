import { gql } from "@/app/lib/gql";

export const getTodosQuery = gql(/* GraphQL */ `
  query Todos {
    todos {
      id
      title
      done
      createdAt
    }
  }
`);
