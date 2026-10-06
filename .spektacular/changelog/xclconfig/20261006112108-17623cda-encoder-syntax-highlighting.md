---
created_date: "2026-10-06"
document_status: draft
project: xclconfig
spec: 20261006112108-17623cda-encoder-syntax-highlighting
plan: 20261006112108-17623cda-encoder-syntax-highlighting
---

# Highlighting documented

The configuration-text page now explains how to colour configuration text: turning highlighting on for a terminal, using a VS Code colour theme and handling a bad one, and writing a renderer for any other format. The events page's example receiver snippet now matches the current example code.

> Derived from project xcl (jumppad-labs/xcl), spec/plan 20261006112108-17623cda-encoder-syntax-highlighting. See the project-level record for the full feature.

## What changed

- `src/pages/configuration-text.mdx`: new "Highlighting" section (In a terminal, With an editor theme, Writing a renderer) before "For reading, not reprocessing", and an intro sentence mentioning colour.
- `src/pages/events.mdx`: the `prettylog.Handler` snippet shows the current three-argument signature and notes that the example colours configuration through `xcl.Highlight`, linking to the new section.

## Why

xcl gained an `xcl.Highlight` encode option and a `highlight` package; the site documents how to use them, and the events page had drifted from the example it quotes.
