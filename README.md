# React Components

Library-first React component system with a docs/demo app in the same repo.

## Consumer Quickstart

```bash
pnpm install
pnpm dev
```

- `pnpm dev`: runs the docs app locally (Vite + `vite.docs.config.ts`).
- `pnpm preview`: serves the built docs output locally (run `pnpm build:docs` first).

## Public API Imports (Important)

Use the library entrypoint only:

- In this repo: import from `src/lib`.
- As a package (when published): import from the package root entrypoint.

Avoid deep imports into internal folders (`src/components/*`, `src/helpers/*`, `src/hooks/*`, `src/pages/*`).

```ts
// Good (repo local, example from app entry)
import { Sidebar, Navbar, initializeTheme } from './lib';

// Good (published package)
import { Sidebar, Navbar, initializeTheme } from 'your-package-name';

// Avoid
import Sidebar from '../components/sidebar';
```

## Icon Usage

Use `Icon` to render Nerd Font symbols while keeping styling in the consumer via `className`.

```tsx
import { Icon } from './lib';

<Icon symbol="nf-md-react" className="text-3xl text-sky-400" />
<Icon
  symbol="nf-fa-triangle_exclamation"
  role="img"
  aria-label="Warning"
  className="text-2xl text-amber-500"
/>
```

- `symbol` is the Nerd Font symbol class (for example `nf-md-react`).
- `className` controls size/color/motion; the component always includes base `nf`.
- Any native `<i>` attributes are forwarded (`role`, `aria-label`, `aria-hidden`, `title`, `data-*`, etc.).

## Styles and Theme Setup

Consumers are responsible for loading library styles and initializing theme behavior.

```ts
import './lib/styles.css';
import { initializeTheme } from './lib';

initializeTheme();
```

- `styles.css` is the single styling entrypoint and loads semantic tokens/themes.
- Token contract lives in `src/lib/theme/tokens.css` and `src/lib/theme/themes.css`.
- Call `initializeTheme()` once at app startup before rendering UI.
- Optional helpers: `applyTheme`, `toggleTheme`, `getStoredTheme`, `setStoredTheme`.

### Token Alias Deprecation Policy (Phase 3)

- Legacy aliases were deprecated in `v1.0.0` and are scheduled for removal in `v2.0.0`.
- Runtime compatibility remains enabled for external consumers through alias blocks in `src/lib/theme/tokens.css` and `src/lib/theme/utilities.css`.
- Internal usage is blocked by validation unless a legacy alias appears inside explicit `legacy-compat` allowlisted blocks.
- Migration matrix: `docs/migrations/legacy-alias-matrix.md`.
- New styles should use semantic tokens (`--ui-*`) and semantic utility classes (`ui-*`) only.

## Build, Validate, and Test

- `pnpm lint`: ESLint checks.
- `pnpm typecheck`: TypeScript project type checks.
- `pnpm test`: runs Vitest test suite.
- `pnpm validate:boundaries`: verifies docs imports use public API boundaries.
- `pnpm validate:semantic-tokens`: blocks legacy aliases outside allowlisted compatibility blocks and enforces removal timeline gates.
- `pnpm build:docs`: builds the docs app to `dist`.
- `pnpm build:lib`: builds the library entrypoint to `dist-lib`.
- `pnpm build`: `typecheck` + docs build + library build.
- `pnpm validate`: full quality gate (`lint` + `typecheck` + boundary check + `build`).

## Migration Note (Internal Consumers)

If you currently import from internal source paths, migrate to the public API:

1. Replace deep imports with `src/lib` imports.
2. Ensure `src/lib/styles.css` is loaded once in your app bootstrap.
3. Ensure `initializeTheme()` is called once during startup.

## Demo

Components preview: https://adanft.github.io/components
