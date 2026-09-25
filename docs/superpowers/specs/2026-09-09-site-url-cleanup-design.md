# Site URL cleanup + seed removal — design

Date: 2026-09-09  
Branch: `fix/test-commit`  
Status: approved (SITE_URL harden + full seed tooling removal)

## Goal

1. Finish the `NEXT_PUBLIC_SITE_URL` / release-docs cleanup so CI does not depend on an Actions secret, production operators know where to set the URL, and invalid env values cannot crash metadata generation.
2. Remove the Sanity seed tooling entirely — content already lives in Sanity Studio; a re-seed path is no longer needed.

## Scope

### In scope

**SITE_URL**

1. Keep the **Vercel project env** section in `.github/RELEASE.md` (already drafted).
2. Harden `metadataBase` in `src/app/layout.tsx` with inline `try/catch` (recommended approach).

**Seed removal (option A)**

3. Delete `src/sanity/content-seed.ts`
4. Delete `src/sanity/seed.ts`
5. Delete `scripts/seed.ts`
6. Remove `"seed"` script from `package.json`
7. Remove the `SANITY_API_WRITE_TOKEN` note from `.env.local.example` (seed-only; not used by the app at runtime)

### Out of scope

- New helper module or unit tests for URL parsing
- Changing GitHub Actions secrets / workflow env further
- Configuring the Vercel dashboard
- Deleting `SANITY_API_WRITE_TOKEN` from the user's local `.env.local` (local secrets; optional operator cleanup)
- Broader Sanity schema / fetch refactors

## Behavior

### Docs

`.github/RELEASE.md` documents that `NEXT_PUBLIC_SITE_URL` is set on the **Vercel project** (and `.env.local` locally), not as an Actions secret. Unset → `http://localhost:3000`.

### `layout.tsx`

1. Trim `NEXT_PUBLIC_SITE_URL`; empty → `http://localhost:3000`
2. Strip trailing `/`
3. `try { new URL(siteUrl) }` for `metadataBase`; on throw → `http://localhost:3000`

### Seed tooling

After removal, `npm run seed` no longer exists. No app or CI path imports the deleted modules (verified: only the seed chain referenced them). Runtime Sanity reads via `src/sanity/lib/fetch.ts` and `env.ts` are unchanged.

## Approach

- URL harden: **inline try/catch** in `layout.tsx` (one call site).
- Seed: **delete the full chain** rather than stubs.

## Success criteria

- [x] RELEASE.md documents Vercel `NEXT_PUBLIC_SITE_URL`
- [x] Invalid `NEXT_PUBLIC_SITE_URL` does not throw in `generateMetadata`
- [x] Seed data/runner files deleted; `package.json` has no `seed` script
- [x] `.env.local.example` no longer documents write-token-for-seed
- [x] `npm run typecheck` / lint still pass with no dangling imports
