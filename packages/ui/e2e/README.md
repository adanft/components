# UI browser regressions

This retained, dev-only integration suite exercises public UI APIs in Chromium, not application E2E. All specs are automatically discovered by `test:browser`; the suite does not use the docs app or its generator.

- **Modal:** real portals and native Tab, Enter, and Escape verify nested dismissal and focus restoration, normally and in React StrictMode.
- **Dropdown Menu:** native Tab and ArrowDown through portaled menu items verify consumer focus callbacks fire exactly once with the focused target while active state is preserved, normally and in React StrictMode.
- **Theme:** real `initializeTheme`/`setTheme` calls verify DOM classes, returned booleans, and writable storage/cookies. Normal controls cover empty and saved storage; injected failures cover unreadable/missing storage, denied getters, storage write/removal errors, cookie setter errors, and combined failures.

- **ThemeSwitch:** controlled public switches in all three sizes verify reduced-motion icon/thumb styles, unchanged normal animations, native Space/click checked changes, and thumb translation.

- **Text contrast:** public Button/Badge matrix measures 108 samples across light/dark themes and background/surface hosts, including explicit Button hover states.

- **Select:** native single-selection state, computed placeholder color and chevron styles, default/reset precedence, controlled string/numeric updates, and disabled form exclusion. An unchecked JavaScript `multiple` prop must still produce a single combobox; unsupported array values are a compile-time contract, not a runtime validation promise.

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
- `fixtures/cases/theme.tsx`: isolated Theme controls using `@adanft/ui/theme`; the output exposes the actual helper return without catching errors.
- `fixtures/cases/dropdown-menu.tsx`: isolated Dropdown Menu case using `@adanft/ui/dropdown-menu`; visible outputs report consumer focus count and target.
- `fixtures/cases/theme-switch.tsx`: isolated controlled switches using `@adanft/ui/theme-switch`; fixture-owned selectors identify each size.
- `fixtures/cases/text-contrast.tsx`: public Button/Badge treatments selected by `/?case=text-contrast`, using production color utilities without fixture background overrides.
- `fixtures/cases/select.tsx`: public `@adanft/ui/select` controls selected by `/?case=select`, with native forms and controlled state.
- `fixtures/main.tsx`: small selector. `/?case=modal` selects Modal and `/?case=theme` selects Theme; `/?case=dropdown-menu` selects Dropdown Menu and `/?case=theme-switch` selects ThemeSwitch. Omitting `case` explicitly defaults to Modal. Add `&strict` for StrictMode. Unknown cases display an error and throw instead of silently selecting Modal.

To add the next component, create `fixtures/cases/<component>.tsx`, add an explicit selection branch in `fixtures/main.tsx`, and create `tests/<component>.spec.ts` that visits `/?case=<component>`. No router or registration framework is needed.

## What the theme checks prove

Theme regressions run in an actual Chromium DOM, with browser storage and cookies for normal controls. Failure cases deliberately replace browser descriptors before invoking the helper: `SecurityError`, `QuotaExceededError`, missing storage, and cookie denial are injected, not evidence of real browser policy denial or physical quota exhaustion. Cookie attempts are counted independently, and writable cookies are checked after storage failure. Each Playwright test owns a fresh browser context, so modified descriptors and persisted state cannot leak into other tests.

## What the ThemeSwitch checks prove

The six size/preference combinations emulate `reduce` and `no-preference` in Chromium. Computed styles must disable both icon animations and the thumb transition under reduced motion, while normal controls retain spin (15s), tilt (5s), infinite linear iterations, and the 400ms transition. Space and label clicks update controlled state and move the thumb to its size-specific checked position and back under both preferences. These checks cover CSS behavior, not OS preference detection or other browsers.

## What the text contrast checks prove

The matrix covers 88 Button samples (11 treatments × 2 states × 2 themes × 2 hosts) and 20 Badge samples (5 variants × 2 themes × 2 hosts). Default 16px/600 Button and 12px/500 Badge text must meet 4.5:1 without ratio rounding. The pointer parks outside controls before normal readings, then hovers explicitly; computed background changes verify the actual hover style after transitions settle.

The bounded helper converts computed CSS colors, including OKLab/color-mix, through a float16 sRGB browser canvas, composites ancestor alpha fills and text alpha, then computes WCAG relative luminance. Math controls cover 21:1 black/white, 1:1 equal colors, and alpha composition. Unsupported opacity, images, filters, blend modes, text shadows, generated content, or missing opaque ancestors fail rather than silently approximate. Canvas precision is finite; this is not a general renderer or a whole-library WCAG audit. Disabled controls, nontext contrast, custom palettes, screen readers, and other browser engines are outside this matrix.

## Isolation

- Playwright owns a Vite server at `http://127.0.0.1:4174`, started from the UI package root. Keep that port free: strict-port startup and disabled reuse prevent testing an unrelated server.
- Separate Vite and TypeScript configs cover nested fixtures and tests. Ordinary Vitest discovery excludes `e2e/**` and retains its default exclusions.
- Playwright remains a UI devDependency. Production dependencies, exports, build scripts, and the package `files` whitelist are unchanged; this suite is not published.
- Missing managed Chromium requires an executable override or the optional manual installation above. System Chromium compatibility can vary with its version.
