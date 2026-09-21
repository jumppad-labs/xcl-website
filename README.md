# xcl-website

The documentation site for [xcl](https://github.com/jumppad-labs/xcl), served
at [xcl.dev](https://xcl.dev). Built with [Astro 5](https://astro.build/)
(MDX) and [Tailwind CSS v4](https://tailwindcss.com/), on the same layout and
components as the Spektacular site.

## Prerequisites

- [Node.js](https://nodejs.org/) v22 or newer

## Local development

```
npm install   # one-time: installs Astro, Tailwind, and MDX
npm run dev   # starts the Astro dev server with HMR
```

Astro prints the local URL (typically `http://localhost:4321/`).

## Build

```
npm run build
```

Outputs the static site to `dist/`. The deploy workflow at
`.github/workflows/deploy.yml` runs the same command in CI and publishes
`dist/` to GitHub Pages on every push to `main`.

## Pages

| Page | Source |
|---|---|
| `/` | `src/pages/index.mdx`: what xcl is and the features it adds to HCL |
| `/examples/application-config/` | `src/pages/examples/application-config.mdx` |
| `/examples/configuration-only/` | `src/pages/examples/configuration-only.mdx` |
| `/examples/plugins/` | `src/pages/examples/plugins.mdx` |

The example pages quote the code in the xcl repository's `example/`
directory. When that code changes, update the pages to match.
