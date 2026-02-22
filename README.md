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

## Build, Validate, and Test

- `pnpm lint`: ESLint checks.
- `pnpm typecheck`: TypeScript project type checks.
- `pnpm test`: runs Vitest test suite.
- `pnpm validate:boundaries`: verifies docs imports use public API boundaries.
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
