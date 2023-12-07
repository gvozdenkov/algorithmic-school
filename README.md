<div align="center">
  <a href="https://cloud.cypress.io/projects/19ebuv/runs">
    <img src="https://img.shields.io/endpoint?url=https://cloud.cypress.io/badge/simple/19ebuv/develop&style=flat&logo=cypress" />
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

| script     | Description                                                   |
| ---------- | ------------------------------------------------------------- |
| `dev`      | Will start vite dev server and run `cypress open` for testing |
| `build`    | Compile TS to js and run `vite build`                         |
| `lint`     | Check codebase with eslint                                    |
| `prettier` | Check codebase style with prettier                            |
| `cy:run`   | Run Cypress all tests                                         |
| `deploy`   | Build and deploy to GH Pages                                  |
