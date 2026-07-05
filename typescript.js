import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'

export default defineConfig([
  ...tseslint.configs.recommendedTypeChecked,
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      // Disable core rules that conflict with TS equivalents
      'no-shadow': 'off',
      'no-use-before-define': 'off',
      'consistent-return': 'off',
      'no-loop-func': 'off',

      // TS equivalents
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/no-use-before-define': ['error', 'nofunc'],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-return': 'error',
      '@typescript-eslint/no-loop-func': 'error',

      // Additional TS rules
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      '@typescript-eslint/no-import-type-side-effects': 'error',
    },
  },
])
