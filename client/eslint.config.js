import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: tseslint.configs.recommended,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'no-console': 'warn',
      eqeqeq: ['error', 'always'],
      'no-duplicate-imports': 'error',
      'prefer-arrow-callback': 'error',
      'max-len': ['error', { code: 80 }],
      'prefer-destructuring': ['error', { object: true, array: false }],
      'spaced-comment': 'warn',
      'consistent-return': 'error',
      'func-names': 'warn',
      'object-shorthand': 'warn',
      'no-param-reassign': 'warn',
      'no-return-await': 'warn',
      'no-underscore-dangle': 'warn',
      'class-methods-use-this': 'error',
      'no-unused-vars': ['error', { argsIgnorePattern: 'req|res|next|val' }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  }
);
