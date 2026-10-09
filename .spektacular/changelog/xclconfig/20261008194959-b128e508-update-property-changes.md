---
created_date: "2026-10-09"
document_status: draft
project: xclconfig
spec: 20261008194959-b128e508-update-property-changes
plan: 20261008194959-b128e508-update-property-changes
---

# Plugins are told what changed

The documentation site now explains what a plugin is told when xcl asks whether a resource changed and when it updates one in place: the settings that changed, with their previous and new values, and the dependencies being updated or replaced. The plugin example page walks through the Docker container moving between networks without being rebuilt, and the container being rebuilt only when its init script's template is replaced. Plans that update a resource only because a dependency changed are now explained on the diff page.

> Derived from project xcl (xclconfig), spec/plan 20261008194959-b128e508-update-property-changes. See the project-level record for the full feature.

## What changed in this repo

- **"Unchanged, update or replace" (`src/pages/replacement.mdx`):**
  - The new `Changed`/`Update` signatures.
  - A new section, "What a resource is told about its settings": the `PropertyChange` struct, values not yet known when deciding, real values when updating, sensitive values, paths and matching with `At`/`Within`, and providers being authoritative over computed values.
  - The Docker worked example with the new container rules, the hot-swap `Update`, the init-script rule and the network detaching on destroy.
  - The extended protocol excerpt.
- **Plugin example (`src/pages/examples/plugins.mdx`):**
  - Code excerpts synced to the example: the init template, `init_script`, template `mode`, `NetworkDisconnect`, the detaching `Destroy`, and the container's `Changed` and `Update`.
  - The claim that the example's `Update` does nothing is removed.
  - Walkthroughs for `make replace`, `swap`, `rebuild-init` (with the content edit) and `remove-network`, with output from real runs.
  - An updated "What to notice".
- **Diff (`src/pages/diff.mdx`):** an update with no changes of its own names the dependencies behind it (`will be updated because … is replaced`, JSON `dependencies`). Only an update with neither changes nor dependencies reads "changed outside xcl".
- **Home (`src/pages/index.mdx`):** the Plugins card mentions what `Changed` and `Update` are told.

## Why

The site is where plugin authors learn the contract. It needed to show the new signatures and how to use the changed settings, with the hot swap and the init-script rebuild as worked examples. It also stated outright that the Docker example's update did nothing, which is no longer true.

## Deviations

`diff.mdx` and `index.mdx` were updated in addition to the two planned pages, to document the new plan field and to remove stale wording.
