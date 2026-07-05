import { defineConfig, globalIgnores } from 'eslint/config'

import react from './react.js'

import base from './index.js'

export default defineConfig([
  globalIgnores(['coverage/**', 'node_modules/**', '.yarn/**']),
  ...base,
  ...react,
  {
    files: ['__fixtures__/**'],
    rules: {
      'unicorn/filename-case': 'off',
    },
  },
])
