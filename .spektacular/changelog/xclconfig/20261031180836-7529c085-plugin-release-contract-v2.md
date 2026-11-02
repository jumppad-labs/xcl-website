---
created_date: "2026-11-02"
document_status: draft
project: xclconfig
spec: 20261031180836-7529c085-plugin-release-contract-v2
plan: 20261031180836-7529c085-plugin-release-contract-v2
---

# The documentation describes the v2 plugin release layout

The site now describes how plugin releases are laid out and installed: a signed index listing a zip for each platform, with only this machine's zip downloaded and checked. Every example pins the plugins' new releases, and the replacement guide shows replace settings declared once with `ReplaceOn`.

> Derived from project xcl (jumppad-labs/xcl), spec/plan 20261031180836-7529c085-plugin-release-contract-v2. See the project-level record for the full feature.

## What changed

- **Installing plugins from GitHub:**
  - Pins Docker v0.4.1.
  - "What a release must contain" lists the index, with a sample, the zip for each platform with its manifest, and the optional signature over the index. It notes that `-` or `_` names both install.
  - The signing section says the index is signed.
  - The cache listing shows the index, signature, zip and extracted files.
  - The checks made on every start and the error descriptions follow the new layout.
- **Plugin template:**
  - Points at the renamed `jumppad-labs/xcl-plugin-template-go`.
  - Shows `ReplaceOn`.
  - The release section lists the new assets and says the workflow signs the index.
- **Registries and home page:** pin Docker v0.4.1, and say a download is checked against its index checksum and signature.
- **Unchanged, update or replace:**
  - The `DefaultChanged` section explains `ReplaceOn`.
  - The Docker worked example quotes the released Docker plugin's providers, which declare their replace settings with `ReplaceOn`.
- **Site config:** the "Use the template" link points at the renamed template repository.

## Why

The registry no longer installs the old layout, with tarballs and a checksums file, so the site has to describe the new one and pin the releases published in it.
