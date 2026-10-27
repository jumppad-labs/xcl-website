---
created_date: "2026-10-26"
document_status: draft
project: xclconfig
spec: 20261023074926-eaa51527-printing-and-highlighting-core
plan: 20261023074926-eaa51527-printing-and-highlighting-core
---

# The website documents xcl's new printing

The guides now show how to print an error, a resource or a change summary from Go in one call. They cover choosing plain text, terminal colour, HTML, inline-styled HTML or SVG, styling output with themes or an imported editor theme, and restyling HTML on your own site with the documented class names or a generated stylesheet. They also explain how to write your own output format and how configuration errors appear in logs.

Pages that described the old highlighting API now describe the new one. Every page keeps its address.

> Derived from project xcl (file), spec/plan 20261023074926-eaa51527-printing-and-highlighting-core. See the project-level record for the full feature.

## What changed in this repo

- **Configuration text** (`src/pages/configuration-text.mdx`). The "Highlighting" section is replaced by "Printing and highlighting", with these parts:
  - `PrintEntity` with mixed options.
  - Output formats and `highlight.For`.
  - Themes: style strings, category fallback and `Validate`.
  - VS Code themes.
  - On a website: the class contract, a table of every class, `WriteCSS` and `template.HTML`.
  - Writing a format.
- **Problems** (`src/pages/problems.mdx`). "Showing problems to a person" now covers `PrintError`: context lines, wrapped errors, width, colour and `%+v`. A new "In logs" section covers zap's `errorVerbose` and slog. The call-to-action points at printing and highlighting.
- **Diffs** (`src/pages/diff.mdx`). The page covers printing with `PrintDiff`, colour with the inserted, deleted and changed kinds and their classes, and writing your own format with `Tokens()`.
- **Events** (`src/pages/events.mdx`). A new "Errors in logs" section, and the prettylog description now refers to `PrintEntity`.
- **Sensitive values** (`src/pages/sensitive-values.mdx`). References to the removed functions are replaced by `PrintDiff` and `Tokens`.
- **Viper example** (`src/pages/examples/viper.mdx`). The error example uses `PrintError`, with real reports.
- **Plugins example** (`src/pages/examples/plugins.mdx`). The main, plan and inspect listings match the updated example sources, and a real report from a broken configuration is shown.

No page was renamed or removed, and navigation is unchanged. The site builds, and `astro check` reports no errors. Python tabs keep their current form and say richer printing in Python is coming.

## Why

The xcl library replaced its highlighting, report and change-summary rendering API, so the site has to document the new printing and stop documenting removed functions. Go users need the new API in one place: one call per output, the formats, the themes, and the class names a website styles.
