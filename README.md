<div align="center">
  <a href="https://github.com/gvozdenkov/algososh/actions/workflows/cypress.yml">
    <img src="https://github.com/gvozdenkov/algososh/actions/workflows/cypress.yml/badge.svg?event=push" />
  </a>
  <a href="http://commitizen.github.io/cz-cli/">
    <img src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg" />
  </a>
</div>

<br />
<div align="center">
  <a href="https://gvozdenkov.github.io/algososh/">
    <img src="README_static/logo_slogan.svg" alt="Fibonacci Algorithmic School logo" height="80">
  </a>
  <br/><br/>
  <p align="center">We study algorithms and more. Powered by Practicum</p>
  <br/>
</div>

---

<div align="center">
  <h4><a href="https://gvozdenkov.github.io/algososh/">Live demo</a></h4>
</div>

![reverse string](README_static/main_screen.png)

|                                             |                                                |                                               |
| :-----------------------------------------: | :--------------------------------------------: | :-------------------------------------------: |
| ![reverse string](README_static/string.png) |  ![fibonacci sequence](README_static/fib.png)  | ![array sort methods](README_static/sort.png) |
| ![reverse string](README_static/stack.png)  | ![fibonacci sequence](README_static/queue.png) | ![array sort methods](README_static/list.png) |

## Motivation

This is an educational project - a fake school of algorithms. I tested all the new technologies and
acquired skills to implement this project. The pages of the site clearly show the operation of some
algorithms and data structures. The project is made completely adaptive - you can watch it both from
your phone and from your TV. The project is written entirely in TypeScript.

## Tech stack

[FSD](https://feature-sliced.design/) used - Architectural methodology for frontend projects

- React with TS
- SCSS
- vite bundler

## Local Development

```bash
git clone git@github.com:gvozdenkov/algososh.git
cd algososh
yarn

# or npm install
yarn dev
# or npm run dev
```

use Node v18 and above

| script           | Description                                                                         |
| ---------------- | ----------------------------------------------------------------------------------- |
| `dev`            | Will start vite dev server and run `cypress open` for testing                       |
| `build`          | Compile TS to js and run `vite build`                                               |
| `lint`           | Check codebase with eslint                                                          |
| `prettier:write` | prettier fix problems, -l flag to show only different from origin                   |
| `prettier:check` | prettier check problems (used in CI to ckeck code formatted localy in cypress.yaml) |
| `cy:run`         | Run Cypress all tests                                                               |
| `deploy`         | Build and deploy to GH Pages                                                        |

## Implementation comments

### Workflow

#### Pre-commit actions

<details>
<summary>1. Lint staged files</summary>
<br/>
Used `husky` & `lint-staged` packages to lint & format staged files only

```sh
# .husky/_/pre-commit
yarn lint-staged && yarn test:jest -o

```

`.lintstagedrc.json` setup sequential running commands for .js|ts|jsx|tsx files in order of array
items

```json
{
  "*.(js|ts|jsx|tsx)": ["yarn prettier:write", "yarn lint"],
  "*.md": "yarn prettier:write"
}
```

</details>

<details>
<summary>2. Commit messages</summary>
<br/>
This project is [Commitizen](https://www.npmjs.com/package/commitizen?activeTab=readme) friendly. So
you can easy create commits in a step by step guide by run:

```bash
yarn cz
# or
npm run cz
```

If you are mannually create commit message it will be linted with `commitlint` to lint commit
messages acording with [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

Commitizen & commitlint setup:

1. Used ligthweight `cz-git` adapter for `commitizen` to generate cli interface for `yarn cz`
2. Setup `cz-git` with `.czrc` file
3. Setup `commitlint` with `commitlint.config.ts`

```json
"devDependencies": {
  "@commitlint/cli": "^18.4.3",
  "@commitlint/config-conventional": "^18.4.3",
  "@commitlint/format": "^18.4.3",

  "commitizen": "^4.3.0",
  "cz-git": "^1.8.0",
}
```

</details>

#### Code formating

<details>
<summary>1. Prettier for formatting</summary>
<br/>

Used Prettier (exact 2.8.7 version) for formatting and Eslint for linting only. So setup

```json
"devDependencies": {
  "eslint": "^8.53.0",
  "prettier": "2.8.7",
  "eslint-plugin-prettier": "4.2.1",
  "eslint-config-prettier": "^9.0.0",
}
```

Settup eslint to highlight style errors with prettier:

```cjs
// .eslintrc.cjs
module.exports = {
  // ...
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    // ...
    // prettier must be the last in extends
    'prettier',
  ],
  // ...
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error'],
    // ...
  },
};
```

Setup CI to check code formating

```yaml
# cypress.yaml

- run: yarn lint

# only check format, not write
- run: yarn prettier:check
```

</details>

<details>
<summary>2. Import order sorting</summary>
<br/>
Used `prettier-plugin-sort-imports` package for prettier to format order of imports

```js
//https://chriscoyier.net/2022/08/09/javascript-import-sorting/

// .prettierrc
"importOrder": [
    "react",
    "<THIRD_PARTY_MODULES>",
    "^(#shared/(config|constants|types|hooks|lib)).*$",
    "^(#shared/ui).*$",
    // Any local imports that AREN'T styles.
    "^(\\.|\\.\\.)/(.(?!.(css|scss)))*$",
    // Styles
    ".(css|scss)$"
  ],
  "importOrderSeparation": true,
  "importOrderSortSpecifiers": true,
  "importOrderCaseInsensitive": true,
```

</details>
