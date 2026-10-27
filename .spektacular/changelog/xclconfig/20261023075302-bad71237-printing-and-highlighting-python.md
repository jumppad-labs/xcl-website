---
created_date: "2026-10-26"
document_status: draft
project: xclconfig
spec: 20261023075302-bad71237-printing-and-highlighting-python
plan: 20261023075302-bad71237-printing-and-highlighting-python
---

# Python printing on xcl.dev

The Python tabs across the documentation now show how to print errors, resources and change summaries from Python, how reports appear on unhandled and logged errors, the output formats, themes, VS Code themes, stylesheet generation, custom formats and logging. The pages no longer say that any of this is unavailable from Python.

> Derived from project xcl, spec/plan 20261023075302-bad71237-printing-and-highlighting-python. See the project-level record for the full feature.

## What changed

- `configuration-text`: Python tabs for printing entities and saved records, the five formats, colour choice, themes and validation, editor themes, the stylesheet, HTML in a template, writing a format and labelled tokens.
- `problems`: Python tabs for printing errors (width, colour, formats, themes), a new "In a traceback" subsection, and logging with `logging.exception` and `LogFormatter`.
- `diff`: Python tabs for printing a change summary, colour, themes, HTML and `diff.tokens`.
- `events`: `xcl.logging_handler` replaces the hand-written logging handler; errors in logs covered for Python.
- `examples/plugins` and `examples/configuration-only`: the Python listings print errors, diffs and entities through the package.
- No page was added, renamed or removed, and navigation is unchanged.

## Why

The xcl-python package now has the printing and logging support Go has; the site documents it. Publish this after the xcl-python release that ships it.
