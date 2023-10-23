import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:3000/api/graphql",
  documents: ["src/**/*.ts"],
  ignoreNoDocuments: true,
  generates: {
    "./src/app/lib/gql/": {
      presetConfig: {
        gqlTagName: "gql",
      },
      preset: "client",
    },
  },
};

export default config;
