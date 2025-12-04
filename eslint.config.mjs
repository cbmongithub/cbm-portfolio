// My flat ESLint config for Next.js + TypeScript + Tailwind stacks
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tailwindPlugin from "eslint-plugin-tailwindcss";
import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  // Next.js defaults for performance and a11y
  ...nextVitals,
  // TypeScript parser options and rules
  ...nextTs,
  // Tailwind's recommended flat config
  ...tailwindPlugin.configs["flat/recommended"],

  // Tailwind plugin settings: where to scan and which helper fns to treat as classnames
  {
    settings: {
      tailwindcss: {
        cssFiles: ["**/*.css", "!**/node_modules", "!**/.next", "!**/dist", "!**/build"],
        callees: ["clsx", "cn", "cva"],
        removeDuplicates: true,
        config: {},
      },
    },
  },

  // Project-wide rules applied to JS/TS files
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    plugins: {
      "simple-import-sort": simpleImportSort,
      tailwindcss: tailwindPlugin,
    },
    rules: {
      // Predictable import grouping for readability
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^react$", "^react-dom$", "^next", "^next/", "^@?\\w"],
            ["^@/hooks"],
            ["^@/components"],
            ["^@/lib"],
            ["^@/types"],
            ["^@/"],
            ["^\\u0000"],
            ["^\\.", "^\\.."],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
      // Enforce Tailwind className ordering and v4+ syntax
      "tailwindcss/classnames-order": "error",
      "tailwindcss/no-unnecessary-arbitrary-value": "warn",
    },
  },

  // Files and folders ESLint should skip entirely
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
