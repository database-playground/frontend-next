import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://localhost:8080/query",
  documents: ["{app,components,contexts,hooks,lib}/**/*.{ts,tsx}"],
  ignoreNoDocuments: true,
  generates: {
    "./gql/": {
      preset: "client",
      presetConfig: {
        fragmentMasking: { unmaskFunctionName: "readFragment" },
      },
      config: {
        useTypeImports: true,
        scalars: {
          Time: "string", // ISO8601
          Cursor: "string",
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
