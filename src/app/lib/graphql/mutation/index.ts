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

export const updateTodoMutation = gql(/* GraphQL */ `
  mutation UpdateTodo($updateTodoId: Int!, $done: Boolean!) {
    updateTodo(id: $updateTodoId, done: $done) {
      id
      title
      done
      createdAt
    }
  }
`);
