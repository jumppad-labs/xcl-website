---
created_date: "2026-10-11"
document_status: draft
project: xclconfig
spec: 20261011095738-fad05e41-language-surface
plan: 20261011095738-fad05e41-language-surface
---

# The site states what the language does

xcl.dev now describes the language as xcl v0.3.0 implements it: variables are overridden from the environment with `XCL_VAR_<name>`, there are 57 built-in functions and applications and plugins can add their own, and a plugin provider's `Functions` method offers functions to configuration. No page was added, removed or renamed.

> Derived from project xclconfig (file), spec/plan 20261011095738-fad05e41-language-surface. See the project-level record for the full feature.

## What changed in this repo

- `src/pages/index.mdx`: the "Variables and outputs" card names `XCL_VAR_<name>`; the "Functions" card says "57 built in" and that you can register a Go function with the application or offer one from a plugin, called by name like any builtin.
- `src/pages/examples/configuration-only.mdx` and `src/pages/examples/plugins.mdx`: the configuration comments use `XCL_VAR_`, with `XCL_VAR_image_tag` and `XCL_VAR_output_dir`.
- `src/pages/plugin-template.mdx`: `Functions` is described as returning the functions the provider offers to configuration, or nil.

## Why

The site claimed `HCL_VAR_` and "around sixty" functions, neither of which was true of the library. With xcl v0.3.0 settling the language, every claim on the site about the environment prefix, functions and templating has to match what the release does.
