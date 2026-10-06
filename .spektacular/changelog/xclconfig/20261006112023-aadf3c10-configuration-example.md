---
created_date: "2026-10-06"
document_status: draft
project: xclconfig
spec: 20261006112023-aadf3c10-configuration-example
plan: 20261006112023-aadf3c10-configuration-example
---

# Configuration example page rewritten, application config page removed

The configuration example page now shows the example as it is: its Go types, its three configuration files, how it loads them and works out ingress routes, how it is tested, and the real output of a run. The application config example page is gone, and every link and call to action that led to it now leads to the configuration example. The sensitive values page illustrates sensitive data with the configuration example's secret.

> Derived from project xcl (xclconfig), spec/plan 20261006112023-aadf3c10-configuration-example. See the project-level record for the full feature.

## What changed in this repo

- `src/pages/examples/configuration-only.mdx`: rewritten from current source, with a new "Testing it" section and real `make run` output; the closing call to action offers only the plugins example.
- `src/pages/examples/application-config.mdx`: deleted; `src/components/Nav.astro` entry removed.
- `src/pages/index.mdx`: hero and closing buttons point at the configuration example; "Two examples".
- `src/pages/state-masking.mdx`: call to action names the configuration example as the example that encrypts its state.
- `src/pages/examples/plugins.mdx`: application-config button removed and the call-to-action body no longer counts it.
- `src/pages/sensitive-values.mdx`: quotes the configuration example's `Secret` type and `secret.xcl`; the Reveal snippet is untitled; the call to action links the configuration example.

## Why

The application config example was removed from xcl, and the site must quote code that exists.
