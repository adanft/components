# UI browser regressions

This dev-only component integration suite exercises public UI APIs in Chromium, not application E2E. Modal is the only case today: real portals and native Tab, Enter, and Escape verify nested dismissal and focus restoration, normally and in React StrictMode. The suite does not use the docs app or its generator.

## Run locally

From the repository root, with a Playwright-managed Chromium already available:

```sh
pnpm test:browser
```

Or use an existing compatible Chromium without downloading a browser:

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium pnpm test:browser
```

For a visible browser or interactive debugging (requires a graphical session):

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium pnpm test:browser --headed
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium pnpm test:browser --debug
```

Browser binaries are not installed by these commands. Installing managed Chromium is a separate, optional manual step:

```sh
pnpm --dir packages/ui exec playwright install chromium
```

To inspect discovery and check types without launching a browser:

```sh
pnpm --dir packages/ui exec playwright test --config e2e/playwright.config.ts --list
pnpm --dir packages/ui exec tsc -p e2e/tsconfig.json --noEmit
```

## Layout and next case

- `tests/*.spec.ts`: Playwright specs, discovered generically rather than by component name.
- `fixtures/cases/modal.tsx`: isolated Modal case using `@adanft/ui/modal`; nested dialogs retain real React ancestry.
- `fixtures/main.tsx`: small selector. `/?case=modal` selects Modal; omitting `case` explicitly defaults to Modal. Add `&strict` for StrictMode. Unknown cases display an error and throw instead of silently selecting Modal.

To add the next component, create `fixtures/cases/<component>.tsx`, add an explicit selection branch in `fixtures/main.tsx`, and create `tests/<component>.spec.ts` that visits `/?case=<component>`. No router or registration framework is needed.

## Isolation

- Playwright owns a Vite server at `http://127.0.0.1:4174`, started from the UI package root. Keep that port free: strict-port startup and disabled reuse prevent testing an unrelated server.
- Separate Vite and TypeScript configs cover nested fixtures and tests. Ordinary Vitest discovery excludes `e2e/**` and retains its default exclusions.
- Playwright remains a UI devDependency. Production dependencies, exports, build scripts, and the package `files` whitelist are unchanged; this suite is not published.
- Missing managed Chromium requires an executable override or the optional manual installation above. System Chromium compatibility can vary with its version.
