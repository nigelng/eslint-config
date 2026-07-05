# Changelog

All notable changes to `@nigelng/eslint-config` are documented here.

## [3.0.0] — 2026-07-05

### Breaking

- Package renamed from `@nigelng/eslint-config-base` to `@nigelng/eslint-config` — consumers must update their dependency name
- Base config rewritten: dropped `eslint-config-airbnb-base` (via `FlatCompat` shim) in favor of `@eslint/js` recommended + `eslint-plugin-import-x` + `eslint-plugin-unicorn` + `eslint-plugin-promise` + `eslint-config-prettier` — lint output changes for all consumers
- Adopted `defineConfig`/`globalIgnores` from `eslint/config` (replaces plain array export + manual `ignores` object)
- Dropped `@babel/eslint-parser` + `@babel/core` + `@babel/preset-env` — uses ESLint's native parser (`ecmaVersion: 'latest'`) instead
- Dropped `eslint-plugin-prettier` — Prettier no longer runs as an ESLint rule; consumers run Prettier separately with `eslint-config-prettier` disabling conflicting rules
- Dropped `eslint-plugin-import` in favor of `eslint-plugin-import-x` (flat-native fork) — rule prefix changes from `import/` to `import-x/`
- Switched to `import-x/resolver-next` with `eslint-import-resolver-typescript` (TypeScript resolver) + `createNodeResolver` (node resolver with `.js`/`.mjs`/`.jsx`/`.ts`/`.tsx` extensions)
- Added `eslint-plugin-unicorn` (full `recommended` preset) + `eslint-plugin-promise` (`flat/recommended`) to base — consumers will see new `unicorn/*` and `promise/*` errors
- Peer dependency `eslint` raised from `^9.0.0` to `^10.4.0` (required by unicorn v69+)
- Peer dependency `@nigelng/prettier-config` removed — this config no longer references it
- `engines.node` raised from `>= 20` to `>= 24`
- `globals` default changed from `es2021` + `jest` to `es2025` (drops `jest` and `node` — consumers add env-specific globals themselves)
- `import/resolver` settings block removed — uses `import-x/resolver-next` instead
- `complexity` rule raised from `max: 5` to `max: 10`
- `ecmaVersion` raised from `2022` to `'latest'`
- `eqeqeq` now ignores null (`['error', 'always', { null: 'ignore' }]`)
- `object-shorthand` now `'always'` (was unconfigured)
- Dropped `lines-between-class-members` (deprecated), `no-duplicate-imports`, `prefer-rest-params`, `prefer-spread`
- Publish trigger changed from push-to-main to `v*` tags

### Added

- Composable entry points:
  - `@nigelng/eslint-config/typescript` — `typescript-eslint` `recommendedTypeChecked`
  - `@nigelng/eslint-config/react` — `@eslint-react` + `eslint-plugin-react-hooks` + `eslint-plugin-jsx-a11y`
  - `@nigelng/eslint-config/security` — `eslint-plugin-regexp` + `eslint-plugin-no-unsanitized`
- `@eslint/js` (recommended) as the base config layer
- `eslint-plugin-import-x` with manual plugin setup (specific import rules enabled, not the full recommended preset)
- `eslint-config-prettier` as the last config element to disable style-conflicting rules
- `__fixtures__/` directory with `sample.jsx` for self-linting
- Base rules: `eqeqeq` (always, null ignore), `no-var`, `prefer-const`, `object-shorthand` (always), `no-eval`, `no-new-func`, `no-loop-func`, `no-param-reassign`, `no-throw-literal`, `consistent-return`, `default-case`, `no-constructor-return`, `no-self-compare`, `no-shadow`, `no-use-before-define`, `no-unused-vars`, `prefer-template`, `prefer-arrow-callback`, `prefer-destructuring`, `import-x/order`, `import-x/no-duplicates`, `import-x/no-unresolved`, `import-x/first`, `import-x/newline-after-import`
- `"description"` field in `package.json`
- `format` and `format:check` scripts in `package.json`
- `@nigelng/prettier-config` as a dev dependency for repo self-formatting
- `.prettierrc.json` replaced with `"@nigelng/prettier-config"` shared config reference
- `prettier.config.mjs` as the ESM Prettier config entry point
- `.prettierignore` (ignores `.yarn/releases/`)
- `LICENSE` file (MIT)
- `CHANGELOG.md` (this file)
- `verify` CI workflow (`.github/workflows/verify.yml`) running `yarn lint` + `yarn format:check` on push/PR
- Dependabot config for `github-actions` and `npm` ecosystems (ignores `eslint` and `prettier` major bumps)
- `.nvmrc` (Node 24) replacing the Nix flake
- `npmMinimalAgeGate: 7` in `.yarnrc.yml` (supply-chain age gate)

### Changed

- `import/order` → `import-x/order` (rule prefix change)
- Yarn 4.16.0 → 4.17.0 (vendored release and `packageManager` pin)
- GitHub Actions bumped to `actions/checkout@v7` and `actions/setup-node@v6`
- `peerDependencies.prettier` relaxed from `^3.8.3` to `>=3.0.0`
- `prettier` dev dependency kept at `3.8.3`
- `.yarnrc.yml` simplified (removed `approvedGitRepositories`, `compressionLevel`, `enableGlobalCache`, `enableScripts`)
- `README.md` fully rewritten

### Removed

- `@babel/core`, `@babel/eslint-parser`, `@babel/preset-env` dependencies
- `eslint-config-airbnb-base` dependency
- `@eslint/eslintrc` dependency (FlatCompat no longer needed)
- `eslint-plugin-import` dependency (replaced by `eslint-plugin-import-x`)
- `eslint-plugin-prettier` dependency
- `@nigelng/prettier-config` peer dependency
- No-op rule overrides: `func-names`, `no-underscore-dangle`, `import/prefer-default-export`
- `.npmignore` (superseded by `files` allowlist in `package.json`)
- `.vscode/settings.json` (referenced deleted `flake.nix`)
- `flake.nix`, `flake.lock`, `.envrc` (replaced by `.nvmrc` + Corepack)
- Dead `import/extensions` override in `eslint.config.js` (rule not enabled by `import-x` recommended)

---

## [2.0.0]

- ESLint 9 flat config migration
- Yarn 4.16.0
- Based on `eslint-config-airbnb-base` via `FlatCompat`

## [1.x]

- ESLint 8 era with legacy `.eslintrc` extends
