---
created_date: "2026-10-10"
document_status: draft
project: xclconfig
spec: 20261009102148-7d0b205b-github-releases-registry
plan: 20261009102148-7d0b205b-github-releases-registry
---

# Guide: installing plugins from GitHub

The documentation site has a new guide, "Installing plugins from GitHub", explaining how an xcl application installs plugins straight from GitHub releases: the one-line declaration, pinning an exact version, what a release must contain, trusting signing keys, private repositories and tokens, the local cache, and the errors. It is listed under Guides in the navigation and linked from the Registries guide.

> Derived from project xcl (github.com/jumppad-labs/xcl), spec/plan 20261009102148-7d0b205b-github-releases-registry. See the project-level record for the full feature.

## What changed in this repo

- New page `src/pages/github-registry.mdx` at `/github-registry/`.
- `src/components/Nav.astro`: "Installing from GitHub" added to the Guides menu.
- `src/pages/registries.mdx`: a paragraph in "Several registries and load order" introducing the GitHub registry and linking to the new page.

The site builds and `astro check` reports no errors or warnings.

## Why

xcl gained a GitHub releases plugin registry, and the documentation site is where application authors learn how to use registries; the new guide documents installing plugins from GitHub there.
