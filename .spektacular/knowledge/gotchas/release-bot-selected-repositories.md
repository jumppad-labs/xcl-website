---
tags: [release, ci, github-app]
---

# The release bot App only reaches repositories added to its selection

The `xcl-release-bot` GitHub App is installed on jumppad-labs for selected repositories, not all of them. A workflow
that takes its token with `actions/create-github-app-token` for a repository outside that selection fails at the
token step, even when `RELEASE_APP_ID` and `RELEASE_APP_PRIVATE_KEY` are set on that repository. When a new repository
needs the bot (as `xcl-website` did for `reference-bump.yml`), add it to the App's repository selection as well as
adding the two secrets. The selection cannot be read with a personal `gh` token
(`user/installations/<id>/repositories` returns 403), so check it in the organisation's installed-App settings.
