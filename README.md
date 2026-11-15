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

## The language references

`/reference/python/` and `/reference/typescript/` are built from data each
package's release publishes. `xcl-python-ref.txt` and `xcl-typescript-ref.txt`
pin the releases, and `npm run reference` (`scripts/fetch-reference.mjs`),
which runs before every build and dev server, downloads each release's
`xcl-lang-<version>-reference.json` into `src/generated/`, which git ignores.
A build fails if either file is missing or describes a different version from
its pin. A new release of either package moves its pin through
`.github/workflows/reference-bump.yml`.

To work without a download, generate the data from a package checkout and
point the build at it:

```
python .github/scripts/api_reference.py --out /tmp/python.json        # in xcl-python
node .github/scripts/api-reference.mjs --out /tmp/typescript.json     # in xcl-typescript
XCL_PYTHON_REFERENCE=/tmp/python.json XCL_TYPESCRIPT_REFERENCE=/tmp/typescript.json npm run build   # here
```

Either variable can be set alone; the other language is still downloaded.

## Pages

| Page | Source |
|---|---|
| `/` | `src/pages/index.mdx`: what xcl is and the features it adds to HCL |
| `/using-xcl-with-python/` | `src/pages/using-xcl-with-python.mdx`: a Python program from `pip install` to a working apply, synchronous then asyncio |
| `/reference/python/` | `src/pages/reference/python.astro`: the Python package's API, rendered from the pinned release's reference data |
| `/events/` | `src/pages/events.mdx`: the event stream, delivery guarantees and connecting it to `log/slog` |
| `/plugin-logging/` | `src/pages/plugin-logging.mdx`: logging from a provider, and when registered plugins load |
| `/registries/` | `src/pages/registries.mdx`: the local registry, declaring types with `RegisterType`, configuration without state, custom registries, load order, and how load problems and clashes are reported |
| `/sensitive-values/` | `src/pages/sensitive-values.mdx`: declaring sensitive fields, unwrapping them, and the errors when one meets a plain field |
| `/state-masking/` | `src/pages/state-masking.mdx`: encrypting sensitive values in state, the reversible-only rule, the plaintext warning and the built-in maskers |
| `/examples/application-config/` | `src/pages/examples/application-config.mdx` |
| `/examples/configuration-only/` | `src/pages/examples/configuration-only.mdx` |
| `/examples/plugins/` | `src/pages/examples/plugins.mdx` |

The example pages quote the code in the xcl repository's `example/`
directory. When that code changes, update the pages to match.
