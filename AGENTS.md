# Documentation publishing

Documentation sources and the locked `docs` dependency group live in
`social-jev/social-jev`. This repository builds and hosts them; do not copy their
sources here or add documentation tools to package runtime dependencies.

## Deployment behavior

- `.github/workflows/publish.yml` publishes the website on pushes to `main`.
  It preserves existing `/docs/` content from the `published` branch.
- Package release notifications build missing documentation from package tags,
  preserving the already published landing page. Stable, alpha, beta and release
  candidate tags are supported. Tags must be reachable from package `main` and
  contain `mkdocs.yml`.
- Generated documentation lives at `/docs/{tag}/`. `/docs/versions.json` lists
  versions in descending release order. `/docs/` selects the newest stable
  version, or the newest prerelease if no stable version exists.
- Do not add scheduled polling or hourly deployments. Retry failures explicitly.

## Backfill missing releases

Trigger the existing release-notification path:

```sh
gh api --method POST repos/social-jev/social-jev.github.io/dispatches \
  -f event_type=package-docs
```

This builds all eligible missing versions and skips versions already published.
It does not rebuild the landing page.

## Correct an already published version

Commit corrected documentation to a package branch whose `pyproject.toml`
version matches the version being corrected. Use a maintenance branch for older
versions; do not move release tags. Then run, substituting the target version
and source branch:

```sh
gh workflow run publish.yml --repo social-jev/social-jev.github.io \
  -f docs_version=v0.1.0a4 \
  -f fetch_docs_from_branch=main
```

The target documentation version must already exist. The strict MkDocs build
must succeed before replacing that version. Other documentation versions and the
landing page are preserved. Confirm the publishing workflow succeeds before
reporting the correction as deployed.
