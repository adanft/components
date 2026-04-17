# RESUME

## 1. Repository Identity

- **Project type**: pnpm workspace monorepo
- **Primary product**: publishable React UI package in `packages/ui` published as `@adanft/ui`
- **Consumer app**: Vite docs app in `apps/docs`, which exercises the package as a real consumer
- **Tech base**: React 19, TypeScript 6, Vite 8, Vitest 4, Tailwind CSS 4, React Router 7, Biome, Changesets
- **Deployment**: docs app publishes to GitHub Pages under `/components/`

## 2. Mental Model Agents Should Use

This repo has TWO explicit workspace boundaries:

1. **`packages/ui`** — the product contract that external consumers install
2. **`apps/docs`** — the first-party consumer that must use `@adanft/ui` exactly like an external app

If docs need something from the library, the correct default is the public package contract:

```ts
import { Button, initializeTheme } from '@adanft/ui';
import '@adanft/ui/styles.css';
```

Deep-importing `packages/ui/src/**` from docs is architecturally WRONG unless the package contract itself changes.

## 3. Runtime Bootstrap and Entrypoints

### Docs runtime path

- `apps/docs/index.html` mounts `apps/docs/src/main.tsx`
- `apps/docs/src/main.tsx`
  - imports `./index.css`
  - calls `initializeTheme()` from `@adanft/ui` before render
  - renders `./app`

### Docs app runtime

- `apps/docs/src/app.tsx`
  - uses `BrowserRouter`
  - registers docs routes and renders docs-owned pages
- `apps/docs/src/shell.tsx`
  - composes docs navigation chrome
  - consumes `Sidebar*` primitives from `@adanft/ui`
  - keeps router-specific behavior inside docs adapters

### Package runtime contract

- `packages/ui/src/index.ts` is the package PUBLIC API
- `packages/ui/styles.css` is the public stylesheet subpath proxy
- `packages/ui/src/styles.css` holds shared theme/base styling only
- `apps/docs/src/index.css` is the docs-owned Tailwind entry that scans both docs and package sources

## 4. Repository Map

### Workspace directories

- `packages/ui` — publishable package manifest, source, tests, Vite/Vitest config, public README
- `apps/docs` — docs app source, adapters, pages, data, tests, Vite/Vitest config
- `scripts` — workspace validation and release guardrails
- `src/__tests__` — root contract tests for workspace/release/documentation rules
- `.changeset` — versioning metadata for `@adanft/ui`
- `.github/workflows` — validation, release, and docs deploy workflows

### High-value files

- `package.json` — workspace scripts, validation chain, release entrypoints
- `biome.json` — repo lint rules plus docs boundary restrictions
- `packages/ui/package.json` — publish contract, exports, peer dependencies, prepack behavior
- `packages/ui/src/index.ts` — public package surface
- `packages/ui/styles.css` — exported stylesheet subpath bridge
- `apps/docs/src/main.tsx` — consumer bootstrap
- `apps/docs/src/index.css` — docs-owned Tailwind entry
- `apps/docs/src/app.tsx` — docs route registration
- `apps/docs/src/adapters/router-sidebar-link.tsx` — docs-only router adapter for package primitives
- `scripts/validate-docs-imports.mjs` — docs boundary validator
- `scripts/validate-semantic-tokens.mjs` — semantic token validator
- `scripts/legacy-alias-policy.mjs` — legacy alias deprecation policy keyed off `packages/ui` version
- `scripts/verify-pack-contract.mjs` — beta publish guardrail for manifest/export/workflow contract

## 5. Public API Contract

The public contract lives in `packages/ui/src/index.ts` and is published as `@adanft/ui`.

If a symbol is not exported there, it is NOT part of the supported package surface.

### Public package groups

- **Layout / navigation primitives**
  - `Sidebar`, `SidebarBody`, `SidebarGroup`, `SidebarHead`, `SidebarLink`, `SidebarSection`
- **Display / feedback**
  - `Accordion`, `Alert`, `Avatar`, `Badge`, `Box`, `Profile`, `Skeleton`, `Tooltip`
- **Inputs / actions**
  - `Button`, `Checkbox`, `Field`, `RadioGroup`, `Select`, `Switch`, `ThemeSwitch`
- **Overlays / interaction**
  - `DropdownMenu`, `Modal`, `Popover`, `Tabs`
- **Data display**
  - `PaginationHead`, `PaginationFoot`, `Table`
- **Theme helpers**
  - `initializeTheme`, `toggleTheme`

### Explicitly docs-only concerns

These stay in `apps/docs` and MUST NOT re-enter the package contract:

- docs `Home`
- docs `NotFound`
- docs `Navbar`
- router adapters like `RouterSidebarLink`
- route data, branding, and docs navigation content

## 6. Styling and Tailwind Model

- `@adanft/ui` is currently a **Tailwind-dependent consumer model**
- Consumers import `@adanft/ui/styles.css`
- Consumers own Tailwind source registration in their app entry stylesheet
- In this repo, `apps/docs/src/index.css` scans:
  - `apps/docs/src`
  - `packages/ui/src`

Important boundary:

- `apps/docs/src/index.css` owns Tailwind scanning
- `packages/ui/src/styles.css` owns shared theme/base styling

Do NOT move Tailwind source ownership back into the package unless the package model changes.

## 7. Testing Strategy

### Layers in use

- `packages/ui/src/__tests__/**` — package component and contract coverage
- `apps/docs/src/__tests__/**` — docs consumer integration coverage
- `src/__tests__/**` — workspace, release, and repository contract coverage

### High-value tests

- `src/__tests__/workspace-monorepo-contract.test.ts` — workspace structure, Tailwind consumer contract, docs boundary rules
- `src/__tests__/release-workspace-contract.test.ts` — release scripts, workflow contract, publish guardrails
- `src/__tests__/repository-docs-contract.test.ts` — repository docs stay aligned with the monorepo reality
- `packages/ui/src/__tests__/public-api-smoke.test.tsx` — behavioral coverage for the exported package API
- `packages/ui/src/__tests__/sidebar-router-boundary.test.tsx` — proves package sidebar primitives stay router-agnostic
- `apps/docs/src/__tests__/docs-consumer-boundary.test.tsx` — proves docs consume `@adanft/ui` rather than package internals
- `apps/docs/src/__tests__/docs-styles-contract.test.tsx` — proves docs bootstrap owns the stylesheet entrypoint contract

## 8. Build, Validation, and Release

### Main scripts

- `pnpm dev` — run the docs app locally from `apps/docs`
- `pnpm test` — run root contract tests plus workspace tests
- `pnpm typecheck` — run TypeScript project references
- `pnpm validate:boundaries` — enforce docs import boundaries
- `pnpm validate:pack-contract` — verify beta publish contract for `@adanft/ui`
- `pnpm validate:semantic-tokens` — enforce semantic token restrictions
- `pnpm validate` — full workspace gate including build
- `pnpm release` — validate pack contract, build `packages/ui`, then publish through Changesets

### Release model

- Changesets drives version intent and publish orchestration
- `packages/ui` is the ONLY publishable package today
- beta publish must pass `pnpm validate:pack-contract` before the workflow publishes

## 9. Agent Guardrails

1. Do not break `packages/ui/src/index.ts` — that is the public contract.
2. Do not let `apps/docs` deep-import `packages/ui/src/**`.
3. Keep router behavior in docs adapters, not in `packages/ui`.
4. Keep docs pages/docs chrome/docs branding inside `apps/docs`.
5. Keep `apps/docs/src/index.css` as the docs-owned Tailwind entrypoint.
6. Keep `packages/ui/styles.css` and `@adanft/ui/styles.css` as supported public contract.
7. Do not trust stale single-package assumptions — this repo is already a workspace monorepo.

## 10. Short Operational Summary

- The product is `@adanft/ui` in `packages/ui`.
- `apps/docs` is the first real consumer and must behave like one.
- Public imports go through `@adanft/ui` and `@adanft/ui/styles.css`.
- Root tests and scripts enforce workspace, release, and documentation contracts.
- Beta publish readiness is guarded by `pnpm validate:pack-contract`.
