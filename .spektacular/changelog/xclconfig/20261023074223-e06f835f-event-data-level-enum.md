---
created_date: "2026-10-26"
document_status: draft
project: xclconfig
spec: 20261023074223-e06f835f-event-data-level-enum
plan: 20261023074223-e06f835f-event-data-level-enum
---

# Python examples use xcl.EventDataLevel

The Python examples and descriptions of event data on xcl.dev now choose the level with `xcl.EventDataLevel` (`NONE`, `RAW` or `PROCESSED`) instead of a string, matching the xcl-python release that refuses strings. Copying an example from the site now gives code that runs on that release. The Go tabs are unchanged.

> Derived from project xclconfig, spec/plan 20261023074223-e06f835f-event-data-level-enum. See the project-level record for the full feature.

## What changed in this repo

- `src/pages/events.mdx`: the Python tab passes `event_data=xcl.EventDataLevel.PROCESSED`, and the list of Python options names `xcl.EventDataLevel` and its three members.
- `src/pages/configuration-text.mdx`: the prose names `event_data=xcl.EventDataLevel.PROCESSED`.
- `src/pages/examples/configuration-only.mdx` and `src/pages/examples/plugins.mdx`: the Python code passes `event_data=xcl.EventDataLevel.PROCESSED`.

## Why

xcl-python now accepts only the enum for the event data level, so every page that showed a string would have shown code that fails. The site keeps Python and Go reading alike, as the library docs do.
