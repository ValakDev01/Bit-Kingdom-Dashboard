import pluginJs from '@eslint/js';
import globals from 'globals';

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      ecmaVersion: 2020,
      globals: globals.node,
    },
    rules: {
      'no-console': 'error',
      'no-var': 'error',
      eqeqeq: ['error', 'always'],
      'no-duplicate-imports': 'error',
      'prefer-arrow-callback': 'error',
      'max-len': ['error', { code: 100 }],
      'no-unused-vars': ['error', { argsIgnorePattern: 'req|res|next' }],
    },
  },
  pluginJs.configs.recommended,
];
