import js from '@eslint/js'
import { defineConfig } from 'eslint/config'
import eslintConfigPrettier from 'eslint-config-prettier'
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'
import importPlugin, { createNodeResolver } from 'eslint-plugin-import-x'
import promise from 'eslint-plugin-promise'
import unicorn from 'eslint-plugin-unicorn'
import globals from 'globals'

export default defineConfig([
  {
    extends: [js.configs.recommended],
  },
  {
    plugins: {
      'import-x': importPlugin,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.es2025,
      },
    },
    rules: {
      // Best practices
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-eval': 'error',
      'no-new-func': 'error',
      'no-loop-func': 'error',
      'no-param-reassign': ['error', { props: false }],
      'no-throw-literal': 'error',
      'consistent-return': 'error',
      'default-case': ['error', { commentPattern: '^no default$' }],
      'no-constructor-return': 'error',
      'no-self-compare': 'error',
      complexity: ['error', { max: 10 }],

      // Variables
      'no-shadow': 'error',
      'no-use-before-define': ['error', 'nofunc'],
      'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],

      // Style (non-Prettier)
      camelcase: ['error', { allow: ['^UNSAFE_'] }],
      'class-methods-use-this': 'off',
      'no-restricted-syntax': [
        'error',
        {
          selector: 'LabeledStatement',
          message:
            'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
        },
        {
          selector: 'WithStatement',
          message:
            '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
        },
      ],

      // ES6+
      'prefer-const': 'error',
      'no-var': 'error',
      'prefer-template': 'error',
      'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
      'object-shorthand': ['error', 'always'],
      'prefer-destructuring': [
        'error',
        { array: false, object: true },
        { enforceForRenamedProperties: false },
      ],

      // Import
      'import-x/order': [
        'error',
        {
          alphabetize: { order: 'asc', caseInsensitive: true },
          'newlines-between': 'always',
        },
      ],
      'import-x/no-duplicates': 'error',
      'import-x/no-unresolved': 'error',
      'import-x/first': 'error',
      'import-x/newline-after-import': 'error',

      strict: 'off',
    },
    settings: {
      'import-x/resolver-next': [
        createTypeScriptImportResolver({}),
        createNodeResolver({
          extensions: ['.js', '.mjs', '.jsx', '.ts', '.tsx'],
        }),
      ],
    },
  },
  unicorn.configs['flat/recommended'],
  promise.configs['flat/recommended'],
  eslintConfigPrettier,
])
