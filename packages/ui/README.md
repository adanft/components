# @adanft/ui

Reusable React UI components from the adanft design system.

## Status

This package is currently published as a **beta** release.

Current beta version: `0.2.0-beta.6`.

## Current package model

`@adanft/ui` is currently designed as a **Tailwind-dependent consumer model**.

That means consumers should:

1. install Tailwind CSS
2. import the package stylesheet contract
3. ensure their Tailwind entry scans both app sources and the compiled package output

The documentation site is the reference consumer implementation.

## Usage

Add the package stylesheet and register the compiled package output as a Tailwind source in your app
stylesheet:

```css
@import "tailwindcss";
@import "@adanft/ui/styles.css";

/* Adjust the relative path from this stylesheet to node_modules. */
@source "../node_modules/@adanft/ui/dist";
```

Then import components from the package root for convenience:

```tsx
import { Button } from '@adanft/ui';
import { initializeTheme, setTheme } from '@adanft/ui/theme';

initializeTheme();
```

Theme helpers keep state transitions explicit: `initializeTheme()` bootstraps CSR from
`localStorage`, while `setTheme(isDark)` applies and persists a user change. In Next/SSR,
read the `theme=dark` cookie server-side, render `<html className="dark">`, and pass that
value into a controlled client component that renders
`<ThemeSwitch checked={isDark} onCheckedChange={handleThemeChange} />`. Pass `disabled` when theme
changes are temporarily unavailable; it disables the native switch input and suppresses change
requests.

You can also import documented public subpaths when you want narrower entrypoints:

```tsx
import Button from '@adanft/ui/button';
import Modal from '@adanft/ui/modal';
import Tabs from '@adanft/ui/tabs';
import { initializeTheme, setTheme } from '@adanft/ui/theme';
```

See the documentation site for the full list of public component subpaths.

## Notes

- The public API is exported from the package root and documented public subpaths.
- Only import from the package root or documented public subpaths.
- Router-specific behavior belongs in the consumer app, not in this package.

## Repository

Source: <https://github.com/adanft/components>
