---
created_date: "2026-11-13"
document_status: draft
project: xclconfig
spec: 20261110084343-9ebf34a1-python-sdk-reference
plan: 20261110084343-9ebf34a1-python-sdk-reference
---

# Python reference and guide on xcl.dev

xcl.dev gains a Python reference at `/reference/python/`, generated from the `xcl-lang` package's own doc comments and kept in step with each release, and a guide at `/using-xcl-with-python/` that walks from an empty program to a working one. Both are in the navigation and linked from the home page.

> Derived from project xcl, spec/plan 20261110084343-9ebf34a1-python-sdk-reference. See the project-level record for the full feature.

## What changed

- `xcl-python-ref.txt` pins the documented `xcl-python` release. `scripts/fetch-python-reference.mjs` runs before every build and dev server. It downloads that release's `xcl-lang-<version>-reference.json` into the gitignored `src/generated/`, or copies the file named by `XCL_PYTHON_REFERENCE`, and fails on a missing file or a version different from the pin.
- `src/pages/reference/python.astro`, `src/components/reference/Entry.astro` and `src/lib/pythonReference.ts` render the reference inside `Shell`: the version, an index, and an anchored entry per dotted name with signature, description, parameters, return value, errors and members. Styles are in `global.css`.
- `src/components/PyRef.astro` links a dotted name to its entry. An unknown name warns, and fails the `reference-check.yml` build, which sets `XCL_REFERENCE_STRICT=1`.
- `.github/workflows/reference-bump.yml`: on an `xcl-python-release` dispatch, it writes the tag, builds the site and pushes to `main` as the release bot only if the build passes. An older or equal tag does nothing.
- `src/pages/using-xcl-with-python.mdx`: the Python guide. `Nav.astro` adds a Reference menu and puts the guide second under Guides. `index.mdx` links both after the Install tabs. `README.md` documents the pin and the override.

## Why

Python developers needed a reference and a walkthrough on the site, inside its own layout. The site renders data the package release publishes, so it never parses Python and its deployment is unchanged.

## Before the first deploy

`xcl-python-ref.txt` holds the placeholder `v0.14.1`, which has no reference asset. Build and deploy fail at the download until the pin names the first `xcl-python` release that carries the asset. Set it before pushing this work to `main`.
