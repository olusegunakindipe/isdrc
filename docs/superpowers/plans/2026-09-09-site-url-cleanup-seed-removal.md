# Site URL cleanup + seed removal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Harden `metadataBase` URL handling, keep RELEASE.md Vercel docs, and delete the unused Sanity seed tooling chain.

**Architecture:** Inline `try/catch` around `new URL` in `generateMetadata`. Delete seed data/runner files and drop the npm script / env example that only existed for seeding. App runtime Sanity fetch stays unchanged.

**Tech Stack:** Next.js App Router, Sanity (read-only at runtime), GitHub Actions docs in RELEASE.md

## Global Constraints

- No new URL helper module or unit tests (spec YAGNI).
- Do not modify GitHub Actions workflow env further.
- Do not edit `.env.local` (local secrets).
- Do not commit unless the user asks.

---

### Task 1: Harden site URL in layout

**Files:**

- Modify: `src/app/layout.tsx` (metadata URL block ~lines 27–32)

**Interfaces:**

- Consumes: `process.env.NEXT_PUBLIC_SITE_URL`
- Produces: `metadataBase: URL` always valid

- [ ] **Step 1: Replace site URL resolution with try/catch**

```tsx
  const fallbackUrl = "http://localhost:3000";
  const rawSiteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || fallbackUrl
  ).replace(/\/$/, "");

  let metadataBase: URL;
  try {
    metadataBase = new URL(rawSiteUrl);
  } catch {
    metadataBase = new URL(fallbackUrl);
  }

  return {
    metadataBase,
```

- [ ] **Step 2: Visually confirm no other `metadataBase` / SITE_URL call sites**

Run: `rg 'NEXT_PUBLIC_SITE_URL|metadataBase' --glob '!node_modules'`
Expected: only `layout.tsx` and `RELEASE.md` / `.env.local.example`

---

### Task 2: Remove full seed tooling

**Files:**

- Delete: `src/sanity/content-seed.ts`
- Delete: `src/sanity/seed.ts`
- Delete: `scripts/seed.ts`
- Modify: `package.json` (remove `"seed"` script)
- Modify: `.env.local.example` (remove write-token / seed lines)

**Interfaces:**

- Consumes: none after deletion
- Produces: no `npm run seed`; no dangling imports

- [ ] **Step 1: Delete the three seed files**

```bash
rm src/sanity/content-seed.ts src/sanity/seed.ts scripts/seed.ts
# remove scripts/ if empty
rmdir scripts 2>/dev/null || true
```

- [ ] **Step 2: Remove seed script from package.json**

Remove the line: `"seed": "npx tsx --env-file=.env.local scripts/seed.ts"`

- [ ] **Step 3: Trim .env.local.example**

Keep Sanity public vars + SITE_URL. Remove:

```
# Optional: write token for `npm run seed` (create in sanity.io/manage → API → Tokens)
SANITY_API_WRITE_TOKEN=
```

- [ ] **Step 4: Confirm no remaining seed imports**

Run: `rg 'content-seed|seedDocuments|scripts/seed|SANITY_API_WRITE_TOKEN' --glob '!node_modules' --glob '!docs/**'`
Expected: no matches in app/source (docs/spec may still mention removal)

---

### Task 3: Verify

**Files:** none (verification only)

- [ ] **Step 1: Typecheck**

Run: `npm run typecheck`
Expected: exit 0

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: exit 0

---

## Spec coverage (self-review)

| Spec item                                    | Task                   |
| -------------------------------------------- | ---------------------- |
| RELEASE.md Vercel note                       | Already present (keep) |
| layout try/catch                             | Task 1                 |
| Delete content-seed / seed.ts / scripts/seed | Task 2                 |
| Remove package.json seed                     | Task 2                 |
| Trim .env.local.example                      | Task 2                 |
| typecheck / lint                             | Task 3                 |
