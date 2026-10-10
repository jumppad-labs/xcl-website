---
created_date: "2026-10-10"
document_status: draft
project: xclconfig
spec: 20261009102138-48e95432-docker-example-standard-layout
plan: 20261009102138-48e95432-docker-example-standard-layout
---

# Plugin pages follow the rebuilt Docker plugin example

The documentation site's plugin example page, replacement page and plugin-logging page now show the Docker plugin example as it is laid out today. Every file they name exists, and every code block they quote matches the example's source. Readers following the pages land on the right files.

> Derived from project xcl (spektacular), spec/plan 20261009102138-48e95432-docker-example-standard-layout. See the project-level record for the full feature.

## What changed in this repo

- **`src/pages/examples/plugins.mdx`**
  - Code block titles now point at `entities/`, `providers/`, `client/docker/docker.go`, `client/containers/containers.go` and `cmd/docker/main.go`.
  - `plugin.go`, the providers and the task layer are re-quoted.
  - The external binary is described as its own module.
  - The application is shown using `pingDocker`, and reading state through `entities`.
  - The testing section names the two mock packages and `make generate` in `plugins/docker`.
- **`src/pages/replacement.mdx`** is retitled to `providers/*.go` and re-quoted, including the explicit network `Changed`.
- **`src/pages/plugin-logging.mdx`** is retitled to `providers/network.go` and re-quoted.

The site builds with `npm run build`.

## Why

The xcl Docker plugin example was rebuilt to the standard plugin layout, and the site's pages quote its files.
