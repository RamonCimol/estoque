// @ts-check

import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";
import globals from "globals";

export default tseslint.config(
  // 1. Arquivos a serem ignorados
  {
    ignores: [
      "node_modules/",
      "dist/", // Pasta de build
      "build/", // Outra pasta de build
      "*.config.js", // Ignora arquivos de config, como este
    ],
  },

  // 2. Regras base do ESLint
  js.configs.recommended,

  // 3. Regras do TypeScript
  // tseslint.config() é um "helper" que aplica configurações
  ...tseslint.configs.recommendedTypeChecked, // Regras recomendadas COM verificação de tipo

  // 4. Configuração do Parser do TypeScript
  {
    files: ["**/*.{ts,tsx}"], // Aplica-se apenas a arquivos TypeScript
    languageOptions: {
      parserOptions: {
        project: true, // Habilita regras que precisam de informação de tipo
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser, // Para projetos Front-end (ex: React, Vue, Angular)
        // ...globals.node,  // Para projetos Back-end (descomente se for Node.js)
      },
    },
  },

  // 5. Integração com Prettier (SEMPRE POR ÚLTIMO!)
  // Desativa regras do ESLint que o Prettier já resolve.
  prettierConfig
);