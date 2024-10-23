import vueEslintParser from 'vue-eslint-parser'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
})

export default [
  {
    ignores: ['dist/', 'node_modules/', 'eslint.config.mjs', '.gitignore', '**/*.d.ts']
  },
  ...compat.extends('prettier'),
  ...compat.env({
    es2020: true,
    node: true
  }),
  {
    files: ['**/*.{vue}'],
    languageOptions: {
      parser: vueEslintParser,
      ecmaVersion: 'latest',
      sourceType: 'module'
    }
  },
]
