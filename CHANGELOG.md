# Changelog

All notable changes to `@nigelng/eslint-config` are documented here.

## [3.0.0] — unreleased

### Breaking

- Package renamed from `@nigelng/eslint-config-base` to `@nigelng/eslint-config` — consumers must update their dependency name
- Base config rewritten: dropped `eslint-config-airbnb-base` (via `FlatCompat` shim) in favor of `@eslint/js` recommended + `eslint-plugin-import-x` + `eslint-config-prettier` — lint output changes for all consumers
- Dropped `@babel/eslint-parser` + `@babel/core` + `@babel/preset-env` — uses ESLint's native parser (`ecmaVersion: 2024`) instead
- Dropped `eslint-plugin-prettier` — Prettier no longer runs as an ESLint rule; consumers run Prettier separately with `eslint-config-prettier` disabling conflicting rules
- Dropped `eslint-plugin-import` in favor of `eslint-plugin-import-x` (flat-native fork) — rule prefix changes from `import/` to `import-x/`
- Peer dependency `eslint` raised from `^9.0.0` to `>=10.0.0`
- Peer dependency `@nigelng/prettier-config` removed — this config no longer references it
- `engines.node` raised from `>= 20` to `>= 24`
- `globals.jest` removed from defaults — consumers using Jest must add it themselves
- `import/resolver` settings block removed — uses `eslint-plugin-import-x` defaults
- Publish trigger changed from push-to-main to `v*` tags

### Added

- `@eslint/js` (recommended) as the base config layer
- `eslint-plugin-import-x` (recommended) as the import plugin
- `eslint-config-prettier/flat` as the last config element to disable style-conflicting rules
- 7 core rules: `eqeqeq` (always), `no-var`, `prefer-const`, `object-shorthand`, `no-duplicate-imports`, `prefer-rest-params`, `prefer-spread`
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

- `complexity` rule loosened from `max: 5` to `max: 7`
- `import/order` → `import-x/order` (rule prefix change)
- `ecmaVersion` raised from `2022` to `2024`
- `globals` default changed from `es2021` + `jest` to `es2024` + `node`
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
- No-op rule overrides: `class-methods-use-this`, `func-names`, `no-underscore-dangle`, `import/prefer-default-export`, `strict`
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
