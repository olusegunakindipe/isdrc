# How releases and production deploys work

## Flow

1. Open a feature branch and merge it to `main` (use [Conventional Commits](https://www.conventionalcommits.org/)).
2. **Release Please** opens or updates a release PR on `main` (changelog + version bump).
3. Merge that release PR into `main`.
4. Release Please creates a GitHub Release + tag (e.g. `v0.2.0`).
5. **Only then** the production deploy job runs.

Feature merges to `main` do **not** deploy to production. Only a completed Release Please release does.

## Commit message examples

- `feat: add advisory board page` → minor bump
- `fix: correct logo sizing` → patch bump
- `feat!: redesign navigation` or `BREAKING CHANGE:` → major bump

## Required GitHub setup

### Repository secrets (Settings → Secrets and variables → Actions)

| Secret | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project for production build |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL |
| `VERCEL_TOKEN` | Vercel deploy token |
| `VERCEL_ORG_ID` | Vercel org/team id |
| `VERCEL_PROJECT_ID` | Vercel project id |
| `RELEASE_PLEASE_TOKEN` | Optional PAT with `contents` + `pull-requests` |

### Environment

Create a GitHub Environment named **`production`** (Settings → Environments) so the deploy job can use it for protection rules / reviewers if you want.

## Files

- [`release-please-config.json`](../release-please-config.json)
- [`.release-please-manifest.json`](../.release-please-manifest.json)
- [`.github/workflows/release-please.yml`](./workflows/release-please.yml)
- [`.github/workflows/ci.yml`](./workflows/ci.yml) — quality checks on PRs and `main` (no production deploy)
