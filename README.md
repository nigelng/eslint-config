# @nigelng/eslint-config-base

Shared [ESLint](https://eslint.org) configuration for Nigel Nguyen projects, based on [eslint-config-airbnb-base](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base) with personal rule tweaks.

See [ESLint configuration](https://eslint.org/docs/latest/use/configure/) for how flat config works.

## Requirements

- **Node.js** 20 or newer
- **ESLint** 9 or newer (`^9.0.0`)
- **Prettier** 3.8.3 or newer (`^3.8.3`)
- **@nigelng/prettier-config** 2.x (`^2.0.0`)

Version **1.x** targets ESLint 8 and legacy `.eslintrc` extends. Stay on 1.x until you upgrade ESLint and Prettier in your project.

## Install

```bash
yarn add -D eslint @nigelng/eslint-config-base prettier @nigelng/prettier-config
```

## Use

In `eslint.config.js`:

```js
import base from '@nigelng/eslint-config-base'

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

## Develop

This repo uses [Yarn 4.16.0](https://yarnpkg.com/) (vendored under `.yarn/releases/`, matching `packageManager` in `package.json`) with `node-modules` linking. With [direnv](https://direnv.net/) and Nix, `use flake` from `flake.nix` provides Node 24 and that Yarn via `nixos-26.05` (pinned in `flake.lock`).

```bash
gh_token   # sets NODE_AUTH_TOKEN for the GitHub npm scope
yarn install
yarn lint
yarn install --immutable   # CI check
```

After changing `.envrc`, run `direnv allow` once.

Pushes to `main` publish `@nigelng/eslint-config-base` to GitHub Packages via the workflow in `.github/workflows/publish.yml`.

## Status

![Publish Package](https://github.com/nigelng/eslint-config-base/workflows/Publish%20Package/badge.svg?branch=main)
