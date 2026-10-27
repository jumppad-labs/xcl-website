---
created_date: "2026-10-26"
document_status: draft
project: xclconfig
spec: 20261023074627-cc23fc08-encode-saved-entity-during-operation
plan: 20261023074627-cc23fc08-encode-saved-entity-during-operation
---

# When configuration text can be rendered

xcl.dev now explains that a saved record can be rendered as configuration text at any time, including from an event handler while an operation runs. It shows how a program prints each created resource as it goes, and that rendering a looked-up entity is refused until the operation finishes.

> Derived from project xclconfig, spec/plan 20261023074627-cc23fc08-encode-saved-entity-during-operation. See the project-level record for the full feature.

## What changed in this repo

- `src/pages/configuration-text.mdx`:
  - the "Converting saved data" section states the rule, with Go and Python handler examples and a note that variables and outputs are not encodable;
  - the `event.entity()` example says `encode_entity` works only once the operation has finished.
- `src/pages/events.mdx` points at `cfg.encode_saved_entity(event.data)` for use inside the handler, rather than `cfg.encode_entity(event.entity())`.

## Why

The site's docs need to match the engine and the Python package, which now allow the saved-record render during an operation.
