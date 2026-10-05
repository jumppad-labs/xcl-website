---
created_date: "2026-10-05"
document_status: draft
project: xclconfig
spec: 20261003153421-6ec0eab3-module-boundary-and-output-entities
plan: 20261003153421-6ec0eab3-module-boundary-and-output-entities
---

# Module boundary and output entities

The site now explains that a module's outputs are the only way to reach inside it, and that a value nested deeper is exposed by re-exporting it as an output. It also shows outputs being read as entities in Go, with `Find[types.Output]` and `.Value`, matching the library.

> Derived from project xclconfig, spec/plan 20261003153421-6ec0eab3-module-boundary-and-output-entities. See the project-level record for the full feature.

## What changed in this repo

- `src/pages/index.mdx`: the Modules card describes the output-only boundary and re-exporting. The Variables and outputs card says outputs are entities read with `Find[types.Output]` and `.Value`.
- `src/pages/examples/plugins.mdx`: adds the example program's snippet reading outputs as `types.Output`, and a "What to notice" bullet on the module boundary with a re-export example. The program output listing is unchanged.

## Why

The library changed how modules and outputs behave, including breaking changes, and the site has to describe the behaviour users will actually see.
