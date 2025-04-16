import globals from 'globals';
import pluginJest from 'eslint-plugin-jest';
import pluginJs from '@eslint/js';
import pluginStylistic from '@stylistic/eslint-plugin';

export default [
  { languageOptions: { globals: { ...globals.browser, ...globals.jest, ...globals.node } } },
  pluginStylistic.configs.customize({ indent: 2, quotes: 'single', semi: true, jsx: true }),
  pluginJs.configs.recommended,
  { ignores: ['dist/*'] },
  { files: ['**/*.test.js'], ...pluginJest.configs['flat/recommended'] },
];
