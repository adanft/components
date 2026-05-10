# Components

Monorepo for the `@adanft/ui` React component library and its docs consumer app.

## Workspace layout

- `packages/ui` — publishable UI package (`@adanft/ui`)
- `apps/docs` — Vite docs app and first real consumer of the package
- `scripts` — workspace validators

## Local development

```bash
pnpm install
pnpm dev
```

Useful commands:

- `pnpm dev` — run the docs app locally
- `pnpm test` — run workspace tests
- `pnpm typecheck` — run workspace type checking

## Package contract

The reusable library lives in `packages/ui` and is consumed as `@adanft/ui`.

- Docs must import from `@adanft/ui`
- Public package imports are available from `@adanft/ui` and documented subpaths like `@adanft/ui/tabs`
- Docs must not deep-import package internals
- `@adanft/ui` is currently a **Tailwind-dependent** package model
- The docs app owns its Tailwind entrypoint as the consumer stylesheet

## Docs preview

https://adanft.github.io/components
