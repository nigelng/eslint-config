import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import { importX } from 'eslint-plugin-import-x'
import globals from 'globals'

export default [
  js.configs.recommended,
  importX.flatConfigs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: {
        ...globals.es2024,
        ...globals.node,
      },
    },
    rules: {
      complexity: ['error', { max: 7 }],

      'import-x/order': [
        'error',
        {
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          'newlines-between': 'always',
        },
      ],

      camelcase: ['error', { allow: ['^UNSAFE_'] }],
      'lines-between-class-members': [
        'error',
        'always',
        { exceptAfterSingleLine: true },
      ],
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
      'no-use-before-define': ['error', 'nofunc'],

      eqeqeq: ['error', 'always'],
      'no-var': 'error',
      'prefer-const': 'error',
      'object-shorthand': 'error',
      'no-duplicate-imports': 'error',
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
    },
  },
  eslintConfigPrettier,
]
