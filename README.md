# @nigelng/eslint-config

Shared [ESLint](https://eslint.org) configuration for Nigel Nguyen projects, based on [`@eslint/js`](https://github.com/eslint/eslint) recommended + [`eslint-plugin-import-x`](https://github.com/un-ts/eslint-plugin-import-x) + [`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier) with personal rule tweaks.

See [ESLint configuration](https://eslint.org/docs/latest/use/configure/) for how flat config works.

## Requirements

- **Node.js** 24 or newer
- **ESLint** 10 or newer (`>=10.0.0`)
- **Prettier** 3.0.0 or newer (`>=3.0.0`)

## Install

```bash
yarn add -D eslint @nigelng/eslint-config prettier
```

## Use

In `eslint.config.js`:

```js
import base from '@nigelng/eslint-config'

export default [
  ...base,
  // optional project overrides
]
```

For Prettier, in `package.json`:

```json
{
  "prettier": "@nigelng/prettier-config"
}
```

Or in `.prettierrc.json`:

```json
"@nigelng/prettier-config"
```

See [@nigelng/prettier-config](https://github.com/nigelng/prettier-config) for Prettier options.

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

## Status

![Verify](https://github.com/nigelng/eslint-config/workflows/Verify/badge.svg?branch=main)
