import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import unusedImports from "eslint-plugin-unused-imports";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

export default [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      ".history/**",
    ],
  },

  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "unused-imports": unusedImports,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",

      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
];
