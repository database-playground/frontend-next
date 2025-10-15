import eslintParserTypeScript from "@typescript-eslint/parser";
import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";
import eslintPluginBetterTailwindcss from "eslint-plugin-better-tailwindcss";

const eslintConfig = [
  {
    ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts"],
  },
  ...coreWebVitals,
  ...typescript,
  {
    files: ["**/*.{ts,tsx,cts,mts}"],
    languageOptions: {
      parser: eslintParserTypeScript,
      parserOptions: {
        project: true,
      },
    },
  },
  {
    files: ["**/*.{jsx,tsx}"],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "better-tailwindcss": eslintPluginBetterTailwindcss,
    },
    rules: {
      // enable all recommended rules to report a warning
      ...eslintPluginBetterTailwindcss.configs["recommended-warn"].rules,
    },
    settings: {
      "better-tailwindcss": {
        // tailwindcss 4: the path to the entry file of the css based tailwind config (eg: `src/global.css`)
        entryPoint: "app/globals.css",
      },
    },
  },
];

export default eslintConfig;
