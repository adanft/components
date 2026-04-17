# adanft components workspace

Monorepo for the `@adanft/ui` React component library and its docs consumer app.

## Workspace layout

- `packages/ui` — publishable UI package (`@adanft/ui`)
- `apps/docs` — Vite docs app and first real consumer of the package
- `scripts` — workspace validators
- `.changeset` — versioning and release metadata

## Local development

```bash
pnpm install
pnpm dev
```

Useful commands:

- `pnpm dev` — run the docs app locally
- `pnpm test` — run workspace tests
- `pnpm typecheck` — run workspace type checking
- `pnpm validate:boundaries` — enforce public API boundaries
- `pnpm validate:pack-contract` — verify the publish manifest/export/workflow contract for `@adanft/ui`
- `pnpm validate:semantic-tokens` — enforce token usage rules

## Package contract

The reusable library lives in `packages/ui` and is consumed as `@adanft/ui`.

- Docs must import from `@adanft/ui`
- Docs must not deep-import package internals
- `@adanft/ui` is currently a **Tailwind-dependent** package model
- `apps/docs/src/index.css` is the consumer-owned Tailwind entrypoint for the docs app

## Release status

This workspace is currently being stabilized for the first public beta release of `@adanft/ui`.

- Recommended initial public version: `0.1.0-beta.1`
- Stable `1.0.0` is **not** the current target yet
- Beta publish guardrail: `pnpm validate:pack-contract`

## Docs preview

https://adanft.github.io/components
