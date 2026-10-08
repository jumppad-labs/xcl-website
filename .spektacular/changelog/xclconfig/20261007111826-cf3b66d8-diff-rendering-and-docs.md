---
created_date: "2026-10-07"
document_status: draft
project: xclconfig
spec: 20261007111826-cf3b66d8-diff-rendering-and-docs
plan: 20261007111826-cf3b66d8-diff-rendering-and-docs
---

# New guide: Diffs

The documentation site has a new Diffs guide. It shows how to see what an apply would do before running it: how to run a diff, what create, update, replace, delete and "known after apply" mean, how sensitive values are hidden and revealed, and how to read and colour the rendered output. The guide is in the Guides menu, and the Sensitive values guide now lists diffs among the outputs that keep secrets hidden.

> Derived from project xcl, spec/plan 20261007111826-cf3b66d8-diff-rendering-and-docs. See the project-level record for the full feature.

## What changed in this repo

- New page `src/pages/diff.mdx` (`/diff/`). Its rendered example is copied verbatim from the library's checked `ExampleRender` output.
- A "Diffs" entry in the Guides navigation (`src/components/Nav.astro`).
- A "Diffs" bullet in the "What xcl shows, and what it keeps" list (`src/pages/sensitive-values.mdx`).

## Why

xcl can now report and render what an apply would change. Users need one place that explains how to run a diff and how to read its output.
