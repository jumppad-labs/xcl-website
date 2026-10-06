---
tags: [astro, redirects, website]
---

# Removing a page breaks its URL

The site has no redirect mechanism: `astro.config.mjs` defines no `redirects`, and
there is no host-level redirect file. Deleting or renaming a page under `src/pages/`
makes its old URL a 404, including links from outside the site.

When a page is removed, repoint every internal link and nav entry to it. If the old URL
matters, add an Astro `redirects` entry in the same change.
