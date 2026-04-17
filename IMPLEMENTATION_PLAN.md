# Implementation Plan — `monorepo-publishable-ui`

This document is the executable checklist for the migration defined in `MIGRATION.md` and planned through SDD artifacts.

## Goal

Migrate the repository from a single-package setup into a workspace monorepo with:

- `packages/ui` as the only publishable package (`@adanft/ui`)
- `apps/docs` as a Vite documentation app
- docs consuming `@adanft/ui` and `@adanft/ui/styles.css` even in local development
- Changesets-based versioning and release automation

## Execution Rules

- Keep the UI package routing-agnostic.
- `Home`, `NotFound`, and docs-only `Navbar` concerns must not remain public package exports.
- `styles.css` is part of the package contract.
- Do not enable publish automation until the package contract is validated.

## Phase 1 — Workspace foundation

- [x] 1.1 Update `/package.json` and create `/pnpm-workspace.yaml` so root scripts resolve `packages/*` and `apps/*`.
- [x] 1.2 Create `/tsconfig.base.json`; retarget `/tsconfig.json`, `/tsconfig.app.json`, and `/tsconfig.node.json` to workspace references.
- [x] 1.3 Create `/packages/ui/package.json`, `/packages/ui/vite.config.ts`, `/apps/docs/package.json`, and `/apps/docs/vite.config.ts` with workspace-safe entrypoints.
- [x] 1.4 Keep this checklist updated as migration batches land.

## Phase 2 — Publishable package extraction

- [x] 2.1 Move `src/lib/components/**` into `/packages/ui/src/components/**` and keep package-local barrels intact.
- [x] 2.2 Move `src/lib/styles.css`, `src/hooks/use-outside-handler.tsx`, and theme runtime files into `/packages/ui/src/{styles.css,hooks/**,theme/**}`.
- [x] 2.3 Move `src/lib/__tests__/**` into `/packages/ui/src/__tests__/**` and update test imports to package-local paths.
- [x] 2.4 Create `/packages/ui/src/index.ts` and `/packages/ui/package.json` exports so only reusable symbols plus `./styles.css` are public.

## Phase 3 — Docs extraction and routing decoupling

- [x] 3.1 Move `src/docs/app.tsx`, `src/docs/pages/**`, `src/docs/data/**`, `src/components/navbar/**`, `src/components/not-found/**`, and `src/pages/home.tsx` into `/apps/docs/src/**` ownership boundaries.
- [x] 3.2 Redesign `/packages/ui/src/components/sidebar/sidebar-link.tsx` to accept `href` and `active` props only; remove router-bound package API.
- [x] 3.3 Create `/apps/docs/src/adapters/router-sidebar-link.tsx` using `NavLink` and swap docs shell/page usage to the adapter.
- [x] 3.4 Update `/apps/docs/src/app.tsx` and `/apps/docs/src/main.tsx` to import only `@adanft/ui` and `@adanft/ui/styles.css`.

## Phase 4 — Build, tests, and config migration

- [x] 4.1 Split root Vite/Vitest config into workspace-aware `/packages/ui/*` and `/apps/docs/*` configs; keep root scripts as thin wrappers only if needed.
- [x] 4.2 Add package contract tests in `/packages/ui/src/__tests__/public-api-smoke.test.tsx` and sidebar/theme coverage for the router-agnostic boundary.
- [x] 4.3 Add docs integration coverage under `/apps/docs/src/**` verifying shell/routes consume `@adanft/ui` instead of source aliases.
- [x] 4.4 Remove obsolete single-app config and alias assumptions after workspace tests pass.

## Phase 5 — Validation, CI, and release workflow

- [x] 5.1 Update `/scripts/validate-docs-imports.mjs`, `/scripts/validate-semantic-tokens.mjs`, and `/scripts/legacy-alias-policy.mjs` for `packages/ui` and `apps/docs` paths.
- [x] 5.2 Replace `/.github/workflows/deploy.yml` with split validation/release workflows that run workspace typecheck/test/build and docs deploy separately.
- [x] 5.3 Add `/.changeset/config.json`, a starter changeset, and root release scripts to version/publish only `/packages/ui`.
- [x] 5.4 Verify the final package contract excludes `Home`, `NotFound`, `Navbar`, and router adapters before enabling publish automation.

## Rollback Notes

- Complete each phase in a coherent batch so regressions can be isolated quickly.
- Do not turn on publish automation before `npm pack` and local docs consumption both pass.
- If workspace import rewrites break docs, validate package exports before touching docs pages again.

## Manual Verification Checklist

- [ ] Docs app builds and runs from `apps/docs`.
- [ ] Docs imports resolve from `@adanft/ui` instead of local source paths.
- [ ] `@adanft/ui/styles.css` loads successfully.
- [ ] Public package exports do not include `Home`, `NotFound`, or docs-only `Navbar`.
- [ ] Router-specific behavior is isolated to docs adapters.
- [ ] Validation scripts use workspace paths.
- [ ] Changesets is configured but publish automation remains gated until package validation is complete.
