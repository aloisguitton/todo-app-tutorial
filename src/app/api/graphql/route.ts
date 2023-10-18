import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import prisma from "@/app/lib/prisma";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

const typeDefs = `#graphql
  type Todo {
    id: Int!
    title: String!
    done: Boolean!
    createdAt: String!
  }

  type Query {
    todos: [Todo!]!
  }

  type Mutation {
    createTodo(title: String!): Todo!
    updateTodo(id: Int!, done: Boolean!): Todo!
  }
`;

const resolvers = {
  Mutation: {
    createTodo: async (_: never, args: { title: string }) => {
      const newTodo = prisma.todo.create({
        data: {
          title: args.title,
          done: false,
        },
      });
      return newTodo;
    },
    updateTodo: async (_: never, args: { done: boolean; id: number }) => {
      const updatedTodo = await prisma.todo.update({
        where: {
          id: args.id,
        },
        data: {
          done: args.done,
        },
      });
      return updatedTodo;
    },
  },
  Query: {
    todos: async () => prisma.todo.findMany(),
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest>(apolloServer);

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}
