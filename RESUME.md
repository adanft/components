# Components — Project Context

This document describes the current state of the project. Treat it as stable project context, not as
a session changelog.

## Project Overview

`components` is a pnpm workspace monorepo for a React UI component library and its documentation
site.

- **Library package**: `@adanft/ui`
- **Package location**: `packages/ui`
- **Docs app**: `apps/docs`
- **Docs URL**: <https://adanft.github.io/components>
- **Docs base path**: `/components/`
- **Default branch**: `main`
- **Current beta package version**: `0.1.0-beta.3`

The docs app is intentionally a real consumer of the package. It must import from `@adanft/ui`, not
from package internals.

## Tech Stack

- React 19
- TypeScript 6
- Vite 8
- Vitest 4
- Tailwind CSS 4
- React Router 7
- Biome
- Changesets
- pnpm workspace

## Workspace Layout

```txt
.
├── apps/
│   └── docs/              # Vite docs app, real consumer of @adanft/ui
├── packages/
│   └── ui/                # Publishable @adanft/ui package
├── scripts/               # Validation and release guardrails
├── src/__tests__/         # Root workspace/release/repository contract tests
├── .changeset/            # Changesets config for npm beta releases
├── .github/workflows/     # CI, release, and docs deploy workflows
├── package.json           # Workspace scripts
├── pnpm-workspace.yaml
└── RESUME.md              # This project context file
```

## Package Boundary Model

There are two core boundaries:

### `packages/ui`

This is the product. It contains the publishable component library.

Important files:

- `packages/ui/package.json` — npm package metadata, exports, peer dependencies, publish config
- `packages/ui/src/index.ts` — public API surface
- `packages/ui/src/styles.css` — package theme/base styles
- `packages/ui/styles.css` — public stylesheet export bridge
- `packages/ui/src/components/**` — component implementations
- `packages/ui/src/__tests__/**` — package tests

If a component/helper is not exported from `packages/ui/src/index.ts`, it is not public API.

### `apps/docs`

This is the documentation site and first-party consumer app. It should behave like an external app.

Important files:

- `apps/docs/src/main.tsx` — docs bootstrap
- `apps/docs/src/app.tsx` — route registration
- `apps/docs/src/shell.tsx` — docs shell/chrome
- `apps/docs/src/data/routes.ts` — route and base path constants
- `apps/docs/src/data/branding.ts` — docs branding and home link
- `apps/docs/src/data/sidebar-navigation.ts` — sidebar navigation and home catalog source
- `apps/docs/src/pages/**` — documentation pages
- `apps/docs/src/adapters/router-sidebar-link.tsx` — React Router adapter for sidebar links
- `apps/docs/src/index.css` — docs-owned Tailwind entrypoint

Docs must use public package imports:

```ts
import { Button, initializeTheme } from '@adanft/ui';
import '@adanft/ui/styles.css';
```

Docs must not deep-import package internals:

```ts
// Wrong
import Button from '../../../packages/ui/src/components/button';
```

## Runtime Flow

### Docs App Startup

1. `apps/docs/index.html` mounts the app.
2. `apps/docs/src/main.tsx` imports docs CSS, calls `initializeTheme()`, and renders `App`.
3. `apps/docs/src/app.tsx` renders `DocsShell` and registers routes.
4. `DocsShell` renders sidebar/navigation using public components from `@adanft/ui`.

### Docs Routing

- The docs app uses React Router.
- The Vite public base is `/components/`.
- `DOCS_HOME_PATH` must preserve the trailing slash through `docsPath('/')`.
- Brand/home links should use `DOCS_HOME_PATH`, not a manually trimmed base path.

## Styling Model

`@adanft/ui` currently uses a Tailwind-dependent consumer model.

- Consumers import `@adanft/ui/styles.css`.
- Consumers own the Tailwind source registration.
- In this repo, `apps/docs/src/index.css` scans both docs and package sources.
- `packages/ui/src/styles.css` contains shared theme/base styling.

Do not move Tailwind scanning ownership into the package unless the package distribution model is
intentionally changed.

### Token Rules

Use semantic tokens/classes. Avoid hardcoded visual values when a semantic token exists.

Prefer:

- `bg-surface`
- `bg-background`
- `text-foreground`
- `text-heading`
- `text-muted`
- `border-border`
- `border-danger`
- `shadow-card`

Avoid reintroducing legacy aliases or random one-off colors unless there is a deliberate design
decision.

## Component Catalog

The docs sidebar is the source of truth for the docs catalog. The home page derives its catalog from
`apps/docs/src/data/sidebar-navigation.ts`.

Only include entries that have real docs pages.

### Primitives

Primitives provide behavior/structure and generally leave styling to consumers.

- `Accordion`
- `Popover`
- `Tabs`
- `Tooltip`

### Components

- `Alert`
- `Avatar`
- `Badge`
- `Box`
- `Button`
- `Checkbox`
- `DropdownMenu`
- `Field`
- `Input`
- `Label`
- `Modal`
- `Pagination`
- `Profile`
- `RadioGroup`
- `Select`
- `Sidebar`
- `Skeleton`
- `Switch`
- `Table`
- `ThemeSwitch`

Do not add fake/demo sidebar entries like Orders, Reports, Analytics, Backup, or Settings unless real
docs pages exist for them.

## Public API Overview

Public exports live in `packages/ui/src/index.ts`.

Current public API includes:

- Components/primitives: `Accordion`, `Alert`, `Avatar`, `Badge`, `Box`, `Button`, `Checkbox`,
  `DropdownMenu`, `Field`, `Input`, `Label`, `Modal`, `PaginationFoot`, `PaginationHead`, `Popover`,
  `Profile`, `RadioGroup`, `Select`, `Sidebar`, `SidebarBody`, `SidebarGroup`, `SidebarGroupLink`,
  `SidebarHead`, `SidebarLink`, `SidebarSection`, `Skeleton`, `Switch`, `Table`, `Tabs`,
  `ThemeSwitch`, `Tooltip`
- Theme helpers: `initializeTheme`, `toggleTheme`
- Public stylesheet: `@adanft/ui/styles.css`

When adding a new public component:

1. Implement it under `packages/ui/src/components`.
2. Export it from `packages/ui/src/index.ts`.
3. Add package tests in `packages/ui/src/__tests__`.
4. Add docs page under `apps/docs/src/pages`.
5. Register route in `apps/docs/src/app.tsx` and route constant in `apps/docs/src/data/routes.ts`.
6. Add sidebar entry in `apps/docs/src/data/sidebar-navigation.ts`.
7. Keep docs imports through `@adanft/ui`.

## Component Design Conventions

### General

- Prefer small composable primitives over large opinionated widgets.
- Preserve native HTML semantics when possible.
- Use controlled APIs for interactive primitives where state needs to be explicit.
- Protect internal ARIA contracts from accidental consumer prop overrides.
- Visual styles should be token-based and easy to override.

### React / TypeScript

- Use React 19 named imports.
- Do not use manual memoization by default.
- Avoid `any`; use precise types or `unknown`.
- Prefer const object + derived type for reusable string unions.
- Keep interfaces/types flat and readable.

### Docs Pages

Docs pages should be concise and useful to consumers.

Preferred structure:

1. Title and short purpose-focused description
2. Usage section with import/snippet
3. Examples section
4. API Reference section when useful

Avoid old breadcrumbs like `components > Tabs`.

Use docs helpers/components:

- `CodeBlock` for snippets
- `Code` for inline code
- `Box`, `Table`, `TableHeader`, `TableBody`, etc. from `@adanft/ui` when appropriate

## Notable Component Contracts

### Field

- Explicit composition API.
- No hidden auto-wiring form controller behavior.
- Consumers pass native IDs/ARIA explicitly.
- `Field.Error` supports `children` and `errors?: Array<{ message?: string } | undefined>`.

### Modal

- `Modal.Title` is optional when `aria-label` or `aria-labelledby` is provided.
- Accessible name precedence: consumer `aria-labelledby` → `aria-label` → generated `Modal.Title` id.
- Focus handling should avoid render-time DOM side effects.

### Popover

- Primitive for interactive floating content.
- Consumers style content explicitly.

### Tooltip

- Primitive for short non-interactive hints.
- Not a replacement for Popover.
- Uses Floating UI with increased spacing/collision padding.

### Tabs

- Controlled compound primitive.
- `Tabs.List` supports `orientation?: 'horizontal' | 'vertical'`.
- Horizontal navigation uses left/right arrows.
- Vertical navigation uses up/down arrows.
- Home/End move to first/last enabled tab.
- Disabled tabs are skipped by keyboard navigation.

### RadioGroup

- `RadioGroup.Item` owns the native radio input.
- Do not use text `Input` for radio items.
- Use `Field.Set`/`Field.Legend` around groups when form semantics matter.

## Validation and Tests

### Main Commands

```bash
pnpm dev
pnpm test
pnpm typecheck
pnpm validate:boundaries
pnpm validate:pack-contract
pnpm validate:semantic-tokens
pnpm validate
```

### Targeted Test Commands

Package component tests:

```bash
pnpm --dir packages/ui exec vitest run --config vitest.config.ts src/__tests__/tabs.test.tsx
```

Docs boundary tests:

```bash
pnpm --dir apps/docs exec vitest run --config vitest.config.ts src/__tests__/docs-consumer-boundary.test.tsx
```

Release contract test:

```bash
pnpm exec vitest run src/__tests__/release-workspace-contract.test.ts
```

### Test Layers

- `packages/ui/src/__tests__/**` — package component tests
- `apps/docs/src/__tests__/**` — docs consumer integration tests
- `src/__tests__/**` — root workspace/release/repository contract tests

Docs tests may print jsdom warnings about pseudo-element `getComputedStyle()`. Existing passing tests
can still emit that warning.

## Release Model

The package release flow uses Changesets.

- Keep `.changeset/config.json`.
- `packages/ui` is the only publishable package.
- `apps/docs` is private and ignored by Changesets.
- While releases are beta-only, releases publish `@adanft/ui` with the npm `latest` tag.
- Current beta package version is `0.1.0-beta.3`.
- Stable `1.0.0` is not the current target.

Release-related commands:

```bash
pnpm validate:pack-contract
pnpm release:latest
```

GitHub workflows:

- `.github/workflows/validate.yml` — validation for `main`
- `.github/workflows/docs-deploy.yml` — docs deploy from `main`
- `.github/workflows/release.yml` — manual package release workflow

## Branching and Git

- The GitHub default branch is `main`.
- Use focused conventional commits.
- Do not add attribution footers to commits.
- Do not force-push unless explicitly requested.
- Do not push unless explicitly requested.
- Do not merge `develop` into `main` until cleanup/release state is intentional.

## Cleanup / Ignore Expectations

Generated artifacts should not be committed:

- `coverage/`
- `.coverage/`
- app/package coverage folders
- build outputs like `dist/`

Project context/documentation that should remain:

- `README.md` — public repo overview
- `RESUME.md` — stable project context
- `.changeset/config.json` — release config

Planning/session artifacts should not remain in the public repo unless intentionally promoted to
product documentation.

## Working Rules

Before changing code:

1. Check branch/status.
2. Read only the relevant files.
3. Keep package and docs boundaries intact.
4. Prefer targeted checks/tests over full builds unless release validation is needed.
5. Keep commits focused.

Useful first command:

```bash
git status --short --branch
```

If working on a component:

1. Inspect its implementation under `packages/ui/src/components/<component>`.
2. Inspect its tests under `packages/ui/src/__tests__`.
3. Inspect its docs page under `apps/docs/src/pages`.
4. Update public exports only if the package surface changes.
5. Run component-specific tests and Biome checks.

If working on docs navigation:

1. Update `apps/docs/src/data/routes.ts` when adding/removing routes.
2. Update `apps/docs/src/app.tsx` route registration.
3. Update `apps/docs/src/data/sidebar-navigation.ts`.
4. Remember that the home catalog derives from sidebar navigation.
5. Run docs boundary tests.
