---
created_date: "2026-10-13"
document_status: draft
project: xclconfig
spec: 20261011211634-a8895873-python-out-of-process-engine
plan: 20261011211634-a8895873-python-out-of-process-engine
---

# Install XCL for Go or Python from the home page

The xcl.dev home page now has an Install section with Go and Python tabs. The Python tab shows `pip install xcl-lang`, says the package bundles the XCL engine and runs it as a subprocess on every platform with the same API and no compiler needed, lists the supported platforms with Alpine (musl) included, and links the PyPI project. The hero badge reads v0.5.0, and the page description says XCL is available for Go and Python.

> Derived from project xcl (jumppad-labs), spec/plan 20261011211634-a8895873-python-out-of-process-engine. See the project-level record for the full feature.

## What changed in this repo

- `src/pages/index.mdx` has a new `Install` section between the hero and "What is XCL?", built with `CodeTabs`. The Go tab gives `go get github.com/jumppad-labs/xcl`. The Python tab gives `pip install xcl-lang`, the bundled-subprocess explanation, the eight platforms and a link to `pypiURL`.
- The hero badge changed from `v0.4.0 · Go and Python` to `v0.5.0 · Go and Python`.
- The page description changed from "Go implementation available now." to "Available for Go and Python."

## Why

xcl-lang 0.5.0 is the first published Python release, and the engine now runs the same way on every platform, Alpine included. The site's only install instructions were for Go.

## Deviations

The Go tab carries a one-line note that no cgo or C compiler is needed, so the two tabs read alike.
