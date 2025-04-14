import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest, // Поддержка глобальных переменных Jest
      },
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module', // Разрешение на использование import/export
      },
    },
    rules: {
      "no-unused-vars": "warn",        // Установим предупреждение для неиспользуемых переменных
      "no-prototype-builtins": "off"   // Отключаем правило для hasOwnProperty
    },
  },
  pluginJs.configs.recommended,
];
