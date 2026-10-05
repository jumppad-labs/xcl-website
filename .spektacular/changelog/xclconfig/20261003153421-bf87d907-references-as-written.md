---
created_date: "2026-10-05"
document_status: draft
project: xclconfig
spec: 20261003153421-bf87d907-references-as-written
plan: 20261003153421-bf87d907-references-as-written
---

# Configuration-text guide

The documentation site has a new **Configuration text** guide, linked from the Guides menu. It explains turning an entity, or its saved data, back into xcl configuration text. It also covers showing provider-filled values, how sensitive values appear, and showing references as the user wrote them, with an example beside the default resolved form.

> Derived from project xcl (xclconfig), spec/plan 20261003153421-bf87d907-references-as-written. See the project-level record for the full feature.

## What changed in this repo

- New page `src/pages/configuration-text.mdx`, in the same Hero/Prose/CtaBanner layout as the other guides. Its wording follows the library README.
- `src/components/Nav.astro` lists "Configuration text" under Guides.

## Why

The library gained `xcl.ShowReferences()`, and the site had no page about configuration text. This guide gives developers one place to learn every option for producing it.
