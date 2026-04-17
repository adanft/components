# Migration Plan — `@adanft/ui`

## 1. Purpose

This document defines the migration from the current single-package repository into a publishable monorepo centered around a single npm package: `@adanft/ui`.

The goal is to separate the reusable UI library from the documentation application, make the library publishable to npm, and establish an automated versioning and release workflow.

## 2. Confirmed Decisions

These decisions were explicitly confirmed and should be treated as constraints for the migration:

- **npm package name**: `@adanft/ui`
- **number of public packages for now**: one package only
- **styling model**: Tailwind-dependent consumer setup with public `styles.css`
- **design system base**: Tailwind CSS 4
- **docs-only artifacts**: `Home`, `NotFound`, and similar site pages are **not** part of the public library
- **repository model**: monorepo
- **release/versioning**: Changesets + GitHub Actions + npm publish
- **docs app runtime**: Vite
- **local docs consumption**: docs must import the package by its real package name, even in local development
- **future shadcn-style registry/CLI**: not in scope for this migration

## 3. Current State

The repository is currently structured as a single package that mixes two responsibilities:

1. **UI library code** under `src/lib`
2. **Documentation/demo application** under `src/docs`

Other characteristics of the current state:

- the root `package.json` is still `private: true`
- docs and library builds are both driven from the root package
- the docs app and the library are coupled in the same source tree
- public exports currently include some docs/site-oriented pieces that should not remain in the library
- the library builds to `dist-lib`, but the repository is not yet shaped like a publishable npm package

## 4. Target State

The repository should become a monorepo with one app and one publishable package:

```txt
components/
├── apps/
│   └── docs/
├── packages/
│   └── ui/
├── .changeset/
├── scripts/
├── package.json
├── pnpm-workspace.yaml
├── tsconfig.base.json
└── biome.json
```

### Responsibilities

#### `packages/ui`

Contains the reusable library:

- components
- hooks
- helpers
- theme runtime
- styles entrypoint
- tests
- public exports

#### `apps/docs`

Contains the documentation site:

- docs pages
- docs shell/layout
- navigation data
- branding/site assets
- app bootstrap

The docs app must consume the library as a real consumer would:

```ts
import { Button } from '@adanft/ui'
import '@adanft/ui/styles.css'
```

## 5. Main Architectural Principles

### 5.1 Library-first

The UI package is the real product. The docs app exists to explain and validate the package.

### 5.2 Public contract is explicit

The package entrypoint will define the public API. If something is not exported from the package contract, it is not part of the supported surface.

### 5.3 Docs must behave like a consumer

The docs app must not import internal source files from the UI package. It must import from `@adanft/ui` exactly like an external project would.

### 5.4 Styles are part of the product contract

Because the library is styled/opinionated, `styles.css` is part of the package surface and must be published intentionally.

### 5.5 Versioning is automated

Package versioning and changelog generation should be driven by Changesets, not manual version bumps.

## 6. Proposed Folder Structure

```txt
components/
├── apps/
│   └── docs/
│       ├── public/
│       ├── src/
│       │   ├── app/
│       │   ├── components/
│       │   ├── data/
│       │   ├── pages/
│       │   ├── shell/
│       │   └── main.tsx
│       ├── index.html
│       ├── package.json
│       ├── tsconfig.json
│       └── vite.config.ts
│
├── packages/
│   └── ui/
│       ├── src/
│       │   ├── components/
│       │   ├── hooks/
│       │   ├── lib/
│       │   ├── styles/
│       │   ├── theme/
│       │   ├── __tests__/
│       │   └── index.ts
│       ├── package.json
│       ├── tsconfig.json
│       └── vite.config.ts
│
├── .changeset/
├── scripts/
├── biome.json
├── package.json
├── pnpm-workspace.yaml
└── tsconfig.base.json
```

## 7. Scope Boundaries

### Must stay in `packages/ui`

- reusable components
- component composition internals
- shared hooks
- class utilities (`cn`, etc.)
- theme helpers (`initializeTheme`, `toggleTheme`, related runtime)
- package styles entrypoint
- UI-focused tests

### Must move to `apps/docs`

- `Home`
- `NotFound`
- docs shell/layout
- docs route definitions
- docs navigation data
- branding content
- example/demo pages

### Needs explicit review

- `Navbar`

Rule: if it is generic and reusable as part of the design system, it can stay in `packages/ui`. If it is docs/site branding chrome, it belongs in `apps/docs`.

## 8. Package Design for `@adanft/ui`

The package must become a real npm package with:

- `name: "@adanft/ui"`
- `type: "module"`
- explicit `exports`
- published CSS entry
- `peerDependencies` for React and React DOM
- build output with JS + types

### Conceptual package contract

```json
{
  "name": "@adanft/ui",
  "type": "module",
  "files": ["dist"],
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    },
    "./styles.css": "./dist/styles.css"
  },
  "peerDependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tailwindcss": "^4.0.0"
  }
}
```

Exact fields may vary, but this is the intended model.

## 9. Build and Tooling Direction

### Root workspace

The root package becomes the workspace orchestrator. It should own:

- shared scripts
- workspace-level validation commands
- repository tooling only (formatting, release orchestration, root contract tests)

### Docs app

The docs app remains on **Vite**.

### UI package

The UI package can keep using Vite initially for a low-friction migration, then be revisited later if a more package-focused builder becomes desirable.

### Tailwind CSS 4

Tailwind 4 remains the official styling base. The migration must preserve that as part of the design system contract.

## 10. Release Strategy

The release workflow should use:

- **Changesets** for version intent and changelog generation
- **GitHub Actions** for release automation
- **npm publish** for distribution

### Expected release flow

1. contributor makes a change
2. contributor adds a changeset
3. CI validates the repo
4. Changesets generates a release/version PR
5. merge triggers package publish
6. docs deploy independently

## 11. Migration Phases

## Phase 1 — Create monorepo skeleton

### Goal

Create the workspace structure before moving code.

### Deliverables

- root `package.json` becomes workspace-oriented
- `pnpm-workspace.yaml`
- `apps/docs/`
- `packages/ui/`
- `tsconfig.base.json`

### Notes

Do not start by moving random files. First define the skeleton.

---

## Phase 2 — Extract UI package

### Goal

Move reusable library code into `packages/ui`.

### Deliverables

- move current `src/lib/**` into `packages/ui/src/**`
- relocate library tests into `packages/ui`
- create `packages/ui/src/index.ts`
- identify and remove docs-only exports from the package

### Notes

`Home` and `NotFound` should not survive as public library exports.

---

## Phase 3 — Extract docs app

### Goal

Move documentation concerns into `apps/docs`.

### Deliverables

- move `src/docs/**` into `apps/docs/src/**`
- move bootstrap entry to `apps/docs/src/main.tsx`
- move `index.html` into `apps/docs`
- move docs assets into `apps/docs/public`

### Notes

The docs app must stop depending on root-local library paths.

---

## Phase 4 — Make docs consume `@adanft/ui`

### Goal

Force the docs app to use the UI package as a real consumer.

### Deliverables

- replace local library imports with `@adanft/ui`
- replace local style imports with `@adanft/ui/styles.css`
- ensure local workspace linking resolves correctly

### Notes

This is one of the most important architectural checks in the migration.

---

## Phase 5 — Define package contract and build output

### Goal

Make `packages/ui` publishable.

### Deliverables

- proper `packages/ui/package.json`
- build output to `dist`
- generated type declarations
- exported CSS entrypoint
- peer dependency cleanup

### Notes

Before publishing anything, validate the package with `npm pack`.

---

## Phase 6 — Integrate Changesets

### Goal

Adopt automated versioning and changelog generation.

### Deliverables

- `.changeset/`
- Changesets config
- root scripts for changesets workflow

---

## Phase 7 — CI/CD split

### Goal

Separate validation, publishing, and docs deployment concerns.

### Deliverables

- PR validation workflow
- release workflow for npm publish
- docs deployment workflow

## 12. Detailed Task Breakdown

### Phase 1 tasks

- create root workspace structure
- convert root scripts to workspace scripts
- define shared base TS config

### Phase 2 tasks

- move `src/lib`
- move tests
- review exports
- classify `Navbar`

### Phase 3 tasks

- move `src/docs`
- move `src/main.tsx`
- move `index.html`
- move docs static assets

### Phase 4 tasks

- rewrite docs imports
- ensure docs use public package entry only
- validate no deep imports remain

### Phase 5 tasks

- define package exports
- ensure CSS export works
- generate declaration files
- test local package consumption

### Phase 6 tasks

- initialize Changesets
- define release scripts
- decide publish access/setup in CI secrets

### Phase 7 tasks

- update GitHub Actions
- separate publish and docs deployment steps

## 13. Risks and Pitfalls

### Risk 1 — exporting too much

If docs/site code leaks into the package, the package contract becomes noisy and hard to maintain.

### Risk 2 — fake local success

If docs keep importing internal paths, the repo may appear healthy while the npm package is actually broken.

### Risk 3 — unclear style contract

Because the library is styled, the package must define exactly how consumers load styles.

### Risk 4 — theme coupling

Theme bootstrapping must belong to the package contract, not remain an accidental docs-only behavior.

### Risk 5 — publishing before package validation

Do not publish until `npm pack` and local consumer validation pass.

## 14. Success Criteria

The migration is successful when all of the following are true:

- the repo is a workspace monorepo
- the reusable library lives in `packages/ui`
- the docs app lives in `apps/docs`
- docs import from `@adanft/ui` even in local development
- `Home` and `NotFound` are no longer library exports
- `styles.css` is part of the package contract
- the UI package can be packed/published cleanly
- versioning is handled through Changesets
- release and docs deploy workflows are separated

## 15. Out of Scope for This Migration

The following are intentionally excluded from this phase:

- shadcn-style registry
- shadcn-style CLI installer
- multiple publishable packages
- Next.js migration for docs
- major visual redesign of the docs app

## 16. Recommended First Implementation Step

The first implementation step should be:

> Create the monorepo skeleton (`apps/docs`, `packages/ui`, root workspace config) **before** moving code.

That gives the migration a stable architectural frame and avoids chaotic file moves.
