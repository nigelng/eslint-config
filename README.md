# @nigelng/eslint-config

Shared [ESLint](https://eslint.org) flat config for modern JavaScript, TypeScript, and React projects. Composable entry points let you pick what you need.

See [ESLint flat config](https://eslint.org/docs/latest/use/configure/) for background.

## Requirements

- **Node.js** >= 24
- **ESLint** >= 10.4 (`^10.4.0`)
- **Prettier** >= 3.0 (`>=3.0.0`)

Prettier is **not** run through ESLint. Run `prettier --check .` (or `prettier --write .`) as a separate step. The base config includes `eslint-config-prettier` as its last entry to disable any formatting rules that conflict with Prettier.

## Install

```bash
yarn add -D eslint prettier @eslint/js @nigelng/eslint-config
```

For TypeScript support:

```bash
yarn add -D typescript typescript-eslint
```

For React/JSX support:

```bash
yarn add -D eslint-plugin-react-hooks eslint-plugin-jsx-a11y
```

For security-focused linting (ReDoS detection + DOM/XSS injection):

```bash
yarn add -D eslint-plugin-regexp eslint-plugin-no-unsanitized
```

> **Note:** `eslint-plugin-prettier` is no longer required. The config uses `eslint-config-prettier` directly; run Prettier separately.

## Use

In `eslint.config.js`:

```js
import base from '@nigelng/eslint-config'
import ts from '@nigelng/eslint-config/typescript'
import react from '@nigelng/eslint-config/react'
import security from '@nigelng/eslint-config/security'

export default [
  ...base,
  ...ts, // optional — TypeScript rules
  ...react, // optional — React/JSX + a11y rules
  ...security, // optional — ReDoS + DOM/XSS security rules
  // If you add your own configs that enable formatting rules, put eslint-config-prettier last:
  // eslintConfigPrettier,
]
```

### TypeScript (type-aware rules)

The `typescript` entry uses `typescript-eslint`'s `recommendedTypeChecked` config, which requires type information and has a performance cost (every linted file is parsed by the TS program). In your `eslint.config.js`, set `tsconfigRootDir` and `project` globs:

```js
import ts from '@nigelng/eslint-config/typescript'

export default [
  ...ts,
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        project: ['./tsconfig.json'],
      },
    },
  },
]
```

For Prettier, in `package.json`:

```json
{
  "prettier": "@nigelng/prettier-config"
}
```

## Entry Points

| Import                              | Description                                                                                                                                                                                    |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@nigelng/eslint-config`            | Base JS rules: best practices, ES6+, import ordering, `@eslint/js` recommended, `eslint-plugin-unicorn` (full `recommended` preset), `eslint-plugin-promise`, plus Prettier conflict disabling |
| `@nigelng/eslint-config/typescript` | TypeScript rules via `typescript-eslint` (type-checked)                                                                                                                                        |
| `@nigelng/eslint-config/react`      | React (@eslint-react), React Hooks, and JSX accessibility rules                                                                                                                                |
| `@nigelng/eslint-config/security`   | `eslint-plugin-regexp` (ReDoS/regex correctness) + `eslint-plugin-no-unsanitized` (DOM/XSS injection)                                                                                          |

### Import resolution

The base config uses `eslint-plugin-import-x` with `eslint-import-resolver-typescript` plus the modern `import-x` node resolver. This supports TypeScript `paths` aliases and `exports` field resolution.

### Unicorn rules

The base config enables `eslint-plugin-unicorn`'s full `recommended` preset (300+ rules). This is opinionated — consumers will see new style errors such as `unicorn/no-array-for-each`, `unicorn/consistent-function-scoping`, `unicorn/prevent-abbreviations`, and `unicorn/filename-case`. To quiet specific rules, disable them in your own config:

```js
export default [
  ...base,
  {
    rules: {
      'unicorn/no-array-for-each': 'off',
      'unicorn/prevent-abbreviations': 'off',
    },
  },
]
```

If the noise is too broad, a future minor may switch to unicorn's `unopinionated` preset (which drops the subjective subset). File an issue if you'd prefer that default.

## Develop

This repo uses [Yarn 4.17.0](https://yarnpkg.com/) (vendored under `.yarn/releases/`, matching `packageManager` in `package.json`) with `node-modules` linking. Node 24 is pinned via `.nvmrc`; Yarn is pinned via `packageManager` (Corepack).

```bash
gh_token   # sets NODE_AUTH_TOKEN for the GitHub npm scope
yarn install
yarn lint
yarn format:check
yarn install --immutable   # CI check
```

Pushes to `main` and pull requests run the `verify` workflow (`.github/workflows/verify.yml`) — `yarn lint` + `yarn format:check`.

To publish a new version:

1. Bump `version` in `package.json` and update `CHANGELOG.md` (change `— unreleased` to the date).
2. Commit and push to `main`. Wait for `verify` to pass.
3. `git tag v<version> && git push origin v<version>` — this triggers the `publish` workflow (`.github/workflows/publish.yml`), which runs `yarn lint` + `yarn format:check` then `yarn npm publish` to GitHub Packages.

### Authentication

Consumers installing `@nigelng/*` packages need a `.npmrc` with:

```ini
@nigelng:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

Set `NODE_AUTH_TOKEN` in your environment (a GitHub PAT with `read:packages` scope).

## Status

![Verify](https://github.com/nigelng/eslint-config/workflows/Verify/badge.svg?branch=main)
