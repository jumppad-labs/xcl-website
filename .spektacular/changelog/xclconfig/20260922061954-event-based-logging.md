---
created_date: "2026-09-22"
document_status: draft
project: xclconfig
spec: 20260922061954-event-based-logging
plan: 20260922061954-event-based-logging
---

# Events, logging and plugin loading guides

xcl.dev now explains how to watch what xcl is doing. A new "Events and logging" guide covers the event stream every validate, apply and destroy produces, and how to connect it to a logger in one line. A new "Plugin logging and loading" guide shows plugin authors how to log with automatic resource and step context, and how plugins are registered and loaded on first use. The example pages show the current code and real output.

> Derived from project xcl (xclconfig), spec/plan 20260922061954-event-based-logging. See the project-level record for the full feature.

## What changed in this repo

- New page `/events/` (`src/pages/events.mdx`): the event stream and its fields, operations, phases and sources, delivery guarantees, receiver errors and panics, the one-line `events.SlogHandler` setup, the `prettylog` example receiver, and the go-plugin exception.
- New page `/plugin-logging/` (`src/pages/plugin-logging.mdx`): logging with `plugins.Logger(ctx)`, the context xcl adds, in-process and external plugins, the plugin-scoped `Init` logger, lazy registration and loading, `ErrPluginLoad` and clash timing.
- Navigation gains a "Guides" dropdown linking both pages, and the README's Pages table lists them.
- The home page's registry snippet uses `NewPluginRegistry()` with an event handler, and its feature card is now "Events and logging".
- The plugins, configuration-only and application-config example pages quote the current example code (`NewPluginRegistry()`, `WithEventHandler(handler)`, the one-line `prettylog` setup, providers logging through `plugins.Logger(ctx)`) and show real output from the styled receiver. The plugins page's configuration block now matches the full example configuration.

## Why

xcl's logging model and plugin registration API changed, and the site still showed passing a logger to the plugin registry and the old event log output. The docs site is where developers learn the library, so it needed guides for the new event stream and plugin logging, and example pages that match the code.
