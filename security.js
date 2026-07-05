import { defineConfig } from 'eslint/config'
import noUnsanitized from 'eslint-plugin-no-unsanitized'
import regexp from 'eslint-plugin-regexp'

export default defineConfig([regexp.configs['flat/recommended'], noUnsanitized.configs.recommended])
