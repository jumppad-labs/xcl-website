---
created_date: "2026-10-08"
document_status: draft
project: xclconfig
spec: 20261008071608-eb05cae0-config-and-plugin-registries
plan: 20261008071608-eb05cae0-config-and-plugin-registries
---

# Config and plugin registries

The documentation now shows xcl's new setup: Go types and plugins both declared on registries added with `WithRegistry`, and configuration-only programs that need no saved state. A new Registries guide explains local registries, load order, how registration problems are reported (an immediate panic for code mistakes, or an error from the first operation for plugin problems), what happens when two providers offer the same block type, and how to write your own registry.

> Derived from project xcl (xclconfig), spec/plan 20261008071608-eb05cae0-config-and-plugin-registries. See the project-level record for the full feature.

## What changed in this repo

- **Updated pages**: the home page hero and configuration-only card; Events, Plugin logging and loading, and Configuration text; and the Configuration-only and Plugins examples. They now use `registry.NewLocal` with `RegisterType`/`RegisterPlugin` + `WithRegistry`, `Event.Entity()`, `c.EncodeSavedEntity` and the two-argument `prettylog.Handler`.
- **Snippets**: the example snippets were refreshed byte for byte from the example sources.
- **Removed content**: the `rejected` discovered-plugin behaviour, which no longer exists, was removed from Plugin logging and loading.
- **New page `/registries/`**, linked from the Guides nav and the README pages table. Its sections:
  - Declaring types
  - Configuration only, without state
  - Local registries
  - Several registries and load order
  - How problems are reported
  - Clashes
  - Writing your own registry
- **Verification**: `npm run build` and `npx astro check` both report 0 errors.

## Why

The site is where users learn how to embed xcl. Every page that showed the removed catalog, `WithPluginRegistry` or the old pretty log handler had to move to the new API, and the new registries and configuration-only mode needed a guide of their own.

## Revision: types declared on registries

After the first implementation, types moved from `Config` onto registries. `xcl.WithType` is removed: plain Go types are declared with `registry.Local.RegisterType`, and `registry.Registry` gains `Types()`. Creating a configuration now returns an error, rather than panicking, when declared types clash: a duplicate in one registry or across two, a keyword in both forms, or a builtin name.
