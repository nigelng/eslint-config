import base from './index.js'

export default [
  {
    ignores: ['coverage/**', 'node_modules/**', '.yarn/**'],
  },
  ...base,
  {
    files: ['eslint.config.js'],
    rules: {
      'import/extensions': 'off',
    },
  },
]
