import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://localhost:8080/query",
  documents: ["{app,components,contexts,hooks,lib}/**/*.{ts,tsx}"],
  ignoreNoDocuments: true,
  generates: {
    "./gql/": {
      preset: "client",
      config: {
        useTypeImports: true,
        scalars: {
          Time: "string", // ISO8601
        },
      },
    },
    "./schema.graphql": {
      plugins: ["schema-ast"],
      config: {
        includeDirectives: true,
      },
    },
  },
};

export default config;