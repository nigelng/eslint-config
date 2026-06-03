import path from 'node:path'
import { fileURLToPath } from 'node:url'

import babelParser from '@babel/eslint-parser'
import { FlatCompat } from '@eslint/eslintrc'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import globals from 'globals'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
})

export default [
  ...compat.extends('airbnb-base', 'plugin:import/errors'),
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        requireConfigFile: false,
        babelOptions: {
          babelrc: false,
          configFile: false,
          presets: ['@babel/preset-env'],
        },
      },
      globals: {
        ...globals.es2021,
        ...globals.jest,
      },
    },
    rules: {
      complexity: ['error', { max: 5 }],
      'import/order': [
        'error',
        {
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          'newlines-between': 'always',
        },
      ],
      'import/prefer-default-export': 'off',
      camelcase: ['error', { allow: ['^UNSAFE_'] }],
      'class-methods-use-this': 'off',
      'func-names': 'off',
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
      'no-underscore-dangle': 'off',
      strict: 'off',
    },
    settings: {
      'import/resolver': {
        node: {
          paths: ['node_modules', './src'],
        },
      },
    },
  },
]
