import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["components/**/*.tsx"],
    rules: {
      "max-lines": ["error", { max: 50 }],
    },
  },
  {
    files: ["app/**/page.tsx"],
    rules: {
      "max-lines": ["error", { max: 20 }],
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/lib/*"],
              message: "Pages may only import components.",
            },
          ],
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
