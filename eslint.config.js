import airbnbBase from 'eslint-config-airbnb-base';
import globals from 'globals';

export default [
  {
    files: ["**/*.js"], // Применение правил ко всем JavaScript файлам
    languageOptions: {
      ecmaVersion: 2021, // Поддержка ECMAScript 2021
      sourceType: "module", // Использование ES6 модулей
      globals: {
        ...globals.browser, // Поддержка глобальных переменных браузера
        ...globals.jest,    // Поддержка глобальных переменных Jest (для тестирования)
        es6: true           // Установка поддержки ES6
      },
    },
    rules: {
      ...airbnbBase.rules, // Используем все правила Airbnb Base
      "no-restricted-syntax": [
        "error",
        "LabeledStatement",
        "WithStatement"
      ],
    },
    ignores: [
      "node_modules/**", // Игнорирование папки node_modules
      "dist/**",         // Игнорирование папки dist, где обычно находятся сборки
      "coverage/**"      // Игнорирование отчетов покрытия тестами
    ],
  },
];
