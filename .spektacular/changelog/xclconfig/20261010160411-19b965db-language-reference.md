---
created_date: "2026-10-11"
document_status: draft
project: xclconfig
spec: 20261010160411-19b965db-language-reference
plan: 20261010160411-19b965db-language-reference
---

# A language reference, and Go and Python tabs on every code example

xcl.dev gains a language reference: eight pages under `/language/` that describe XCL itself, from files and entities through attributes and blocks, references, expressions, variables and outputs, modules and every built-in function, with the matching Go struct and Python dataclass beside each shape of configuration. Every code example on the site that shows application code now offers Go and Python tabs; picking a language switches every example on the page and is remembered on the next one. The reference is in the main navigation and linked from the home page, and every example was tried against xcl v0.4.0 so the pages say exactly what that release does.

> Derived from project xclconfig (spektacular), spec/plan 20261010160411-19b965db-language-reference. See the project-level record for the full feature.

## What changed in this repo

- `src/components/CodeTabs.astro` (new): the tabbed code box with `go` and `python` named slots, each holding an ordinary fenced block rendered by Expressive Code with its title; a `role="tablist"` with two `role="tab"` buttons carrying `data-lang-choice`, and two `role="tabpanel"` panels carrying `data-lang-panel`, shown by CSS from `html[data-lang]`.
- `src/components/Head.astro`: an inline pre-paint script reads `localStorage` key `xcl-lang` (guarded) and sets `data-lang` on `<html>`, defaulting to `go`.
- `src/layouts/Shell.astro`: the click and keyboard handler beside the existing inline scripts: switches the attribute, stores the choice, syncs `aria-selected` and `tabindex`, handles ArrowLeft, ArrowRight, Home and End, and keeps the clicked box in place on screen.
- `src/config/site.ts`: `pythonRepoURL`, `pythonParityURL` and `pypiURL` (`https://pypi.org/project/xcl-lang/`).
- `src/components/Nav.astro`: a "Language" dropdown between "Features" and "Examples" listing the eight reference pages, overview first.
- `src/pages/language/index.mdx`, `entities.mdx`, `attributes-and-blocks.mdx`, `references.mdx`, `expressions.mdx`, `variables-and-outputs.mdx`, `modules.mdx`, `functions.mdx` (new): the reference. Configuration comes first on every page, a tabbed Go and Python box follows wherever configuration meets application code, each page ends with links onward, and the pages call blocks entities and never say "superset", "interpolation" or "Terraform". The functions page lists all 57 built-ins with a runnable example each.
- `src/pages/registries.mdx`, `github-registry.mdx`, `events.mdx`, `sensitive-values.mdx`, `state-masking.mdx`, `configuration-text.mdx`, `diff.mdx`, `index.mdx`, `examples/configuration-only.mdx`: every Go application-code box is now a `CodeTabs` box with a Python panel doing the same thing with the same names and values; Go-only capabilities (a custom registry, a custom masker, `EncodeEntity`, `IncludeComputed`, `ShowReferences`, editor themes, a custom renderer, diff rendering) carry a "not yet available from Python" note naming what Python offers and linking the parity list. Prose changed only where the Python version needs it.
- `src/pages/plugin-template.mdx`, `plugin-logging.mdx`, `replacement.mdx`, `examples/plugins.mdx`: each opens with a statement that plugins are written in Go for now and work from Go and Python applications; plugin and provider code stays Go-only; boxes showing an application loading or using a plugin, including the twelve `xcl-docker` program boxes, have Python panels (`register_external_plugin`, `register_plugin_directory`, `GitHubRegistry.register_plugin`, `xcl.Config(state_path=…, on_event=…, event_data="processed")`, `apply`, `diff`, `load`, `find_by_type(None, …)`, `find(None, …)`, `destroy`, `xcl.PluginLoadError`); the Python inspect module is `inspect_entity.py`, with a sentence saying why.
- `src/pages/index.mdx`: the "What is XCL?" section links the reference with a "Learn the language →" button; a "Documentation" section after "Two examples" lists the reference first, leaving room for the Go and Python guides; the "Variables and outputs", "Modules" and "Functions" feature cards link to their reference pages; the hero badge reads "v0.4.0 · Go and Python" and the tagline ends "Available for Go and Python."
- Corrections from verifying against v0.4.0: the overview says a path with another extension is read as empty; the duplicate-name error is quoted with its real separator and range; the references page says a cycle is not caught by `Validate` and fails at `Apply`; the functions page sorts the set functions' results and marks a set published as it is through an `output` as not yet supported; the variables page no longer claims a root output can be read as `output.<name>`; the GitHub registry page says a bad repository or version aborts a Python process when `xcl.Config` is created.

No dependency was added, no page was moved or renamed, and the automated gates stay `npx astro check` and `npm run build`. Tab behaviour, reachability, acceptance coverage, terminology and the plugin-page statement are manual checks recorded in the plan's test plan.

## Why

The site explained features one at a time and showed only Go. The reference gives the language a home where each question has a section with a stable link and the Go and Python types sit beside the configuration they receive; the tabs let a Python developer read the whole site in their language without meeting Go outside plugin authoring, and let a Go developer keep Go. Verifying every example against the release makes the pages a description of what v0.4.0 does rather than what was planned.
