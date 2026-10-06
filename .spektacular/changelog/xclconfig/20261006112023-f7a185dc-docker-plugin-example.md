---
created_date: "2026-10-06"
document_status: draft
project: xclconfig
spec: 20261006112023-f7a185dc-docker-plugin-example
plan: 20261006112023-f7a185dc-docker-plugin-example
---

# Docker plugin example

The documentation site now describes the rewritten plugin example: an external Docker plugin that creates real networks and containers, and an in-process template plugin that renders a file. Every code snippet taken from the example matches its current source, and every output block comes from a real run. Readers no longer see the old postgres, redis, app and ingress example.

> Derived from project xcl (xcl-website), spec/plan 20261006112023-f7a185dc-docker-plugin-example. See the project-level record for the full feature.

## What changed in this repo

- **Plugin example page.** `src/pages/examples/plugins.mdx` is rewritten end to end. It covers:
  - the configuration and types;
  - the Docker plugin's `Init`, client interface, providers and binary;
  - the template plugin with no subtype;
  - the program's `apply`/`report`/`destroy`;
  - a testing section (mock-backed unit tests, skipping without Docker, `make generate`);
  - real `make run` output at info and debug level;
  - a rewritten "What to notice".
- **Plugin logging page.** `src/pages/plugin-logging.mdx` now quotes the Docker and template providers and real log lines. It describes the `provider=` tag accurately: added in-process only, naming the subtype, or the type when there is none.
- **Events page.** `src/pages/events.mdx` now shows real `docker.network.app` lines, the sources `TemplatePlugin` and `docker-plugin`, the new `main.go` handler line and the real missing-plugin error.
- **Home page.** The plugins-example bullet in `src/pages/index.mdx` names the Docker and template plugins.

## Why

These pages quoted the old plugin example verbatim, so they had to change with it to stay true.
