import { gql } from "@/app/lib/gql";

export const insertTodoMutation = gql(/* GraphQL */ `
  mutation Mutation($title: String!) {
    createTodo(title: $title) {
      id
      title
      done
      createdAt
    }
  }
`);
