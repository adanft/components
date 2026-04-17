import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

const repoRoot = path.resolve(import.meta.dirname, '../..');

function readRepoFile(relativePath: string) {
  return readFileSync(path.join(repoRoot, relativePath), 'utf8');
}

describe('workspace monorepo contract', () => {
  it('registers packages and apps as pnpm workspaces', () => {
    expect(existsSync(path.join(repoRoot, 'pnpm-workspace.yaml'))).toBe(true);

    const packageJson = JSON.parse(readRepoFile('package.json')) as {
      scripts?: Record<string, string>;
    };

    expect(packageJson.scripts?.dev).toContain('apps/docs');
    expect(packageJson.scripts?.test).toContain('--recursive');
  });

  it('creates workspace manifests and shared tsconfig files', () => {
    expect(existsSync(path.join(repoRoot, 'tsconfig.base.json'))).toBe(true);
    expect(existsSync(path.join(repoRoot, 'packages/ui/package.json'))).toBe(true);
    expect(existsSync(path.join(repoRoot, 'apps/docs/package.json'))).toBe(true);
  });

  it('shares test matcher types across workspace projects', () => {
    const packageTsconfig = JSON.parse(readRepoFile('packages/ui/tsconfig.json')) as {
      compilerOptions?: { types?: string[] };
    };
    const docsTsconfig = JSON.parse(readRepoFile('apps/docs/tsconfig.json')) as {
      compilerOptions?: { types?: string[] };
    };

    expect(packageTsconfig.compilerOptions?.types).toContain('@testing-library/jest-dom');
    expect(docsTsconfig.compilerOptions?.types).toContain('@testing-library/jest-dom');
  });

  it('maps the local package contract for docs type resolution', () => {
    const baseTsconfig = JSON.parse(readRepoFile('tsconfig.base.json')) as {
      compilerOptions?: {
        baseUrl?: string;
        paths?: Record<string, string[]>;
      };
    };

    expect(baseTsconfig.compilerOptions?.baseUrl).toBe('.');
    expect(baseTsconfig.compilerOptions?.paths?.['@adanft/ui']).toEqual([
      './packages/ui/src/index.ts',
    ]);
    expect(baseTsconfig.compilerOptions?.paths?.['@adanft/ui/styles.css']).toEqual([
      './packages/ui/src/styles.css',
    ]);
  });

  it('rebalances workspace manifest ownership around the scoped package contract', () => {
    const rootManifest = JSON.parse(readRepoFile('package.json')) as {
      devDependencies?: Record<string, string>;
    };
    const uiManifest = JSON.parse(readRepoFile('packages/ui/package.json')) as {
      name: string;
      devDependencies?: Record<string, string>;
      peerDependencies?: Record<string, string>;
      dependencies?: Record<string, string>;
    };
    const docsManifest = JSON.parse(readRepoFile('apps/docs/package.json')) as {
      dependencies?: Record<string, string>;
      devDependencies?: Record<string, string>;
    };

    expect(uiManifest.name).toBe('@adanft/ui');
    expect(rootManifest.devDependencies?.react).toBeUndefined();
    expect(rootManifest.devDependencies?.['@vitejs/plugin-react']).toBeUndefined();
    expect(rootManifest.devDependencies?.tailwindcss).toBeUndefined();

    expect(uiManifest.peerDependencies?.react).toBeDefined();
    expect(uiManifest.peerDependencies?.['react-dom']).toBeDefined();
    expect(uiManifest.peerDependencies?.tailwindcss).toBeDefined();
    expect(uiManifest.devDependencies?.vite).toBeDefined();
    expect(uiManifest.devDependencies?.vitest).toBeDefined();
    expect(uiManifest.devDependencies?.['react-router']).toBeUndefined();
    expect(uiManifest.dependencies?.['@floating-ui/react']).toBeDefined();
    expect(uiManifest.dependencies?.['react-router']).toBeUndefined();

    expect(docsManifest.dependencies?.['@adanft/ui']).toBe('workspace:*');
    expect(docsManifest.dependencies?.react).toBeDefined();
    expect(docsManifest.dependencies?.['react-dom']).toBeDefined();
    expect(docsManifest.devDependencies?.vite).toBeDefined();
    expect(docsManifest.devDependencies?.tailwindcss).toBeDefined();
  });

  it('tracks migration operations with a docs checklist', () => {
    expect(
      existsSync(path.join(repoRoot, 'docs/implementation/monorepo-publishable-ui-checklist.md')),
    ).toBe(true);
  });

  it('uses a docs-owned Tailwind entry that scans docs and package sources', () => {
    const docsEntryCss = readRepoFile('apps/docs/src/index.css');

    const tailwindImportIndex = docsEntryCss.indexOf('@import "tailwindcss" source(none);');
    const packageStylesImportIndex = docsEntryCss.indexOf('@import "@adanft/ui/styles.css";');
    const docsSourceIndex = docsEntryCss.indexOf('@source "./";');
    const packageSourceIndex = docsEntryCss.indexOf('@source "../../../packages/ui/src";');

    expect(docsEntryCss).toContain('@import "tailwindcss" source(none);');
    expect(docsEntryCss).toContain('@source "./";');
    expect(docsEntryCss).toContain('@source "../../../packages/ui/src";');
    expect(docsEntryCss).toContain('@import "@adanft/ui/styles.css";');
    expect(tailwindImportIndex).toBeGreaterThanOrEqual(0);
    expect(packageStylesImportIndex).toBeGreaterThanOrEqual(0);
    expect(docsSourceIndex).toBeGreaterThanOrEqual(0);
    expect(packageSourceIndex).toBeGreaterThanOrEqual(0);
    expect(tailwindImportIndex).toBeLessThan(packageStylesImportIndex);
    expect(packageStylesImportIndex).toBeLessThan(docsSourceIndex);
    expect(docsSourceIndex).toBeLessThan(packageSourceIndex);
  });

  it('keeps the package stylesheet focused on the shared theme contract', () => {
    const packageStyles = readRepoFile('packages/ui/src/styles.css');

    expect(packageStyles).not.toContain('@import "tailwindcss";');
    expect(packageStyles).toContain('@import "./theme/utilities.css";');
    expect(packageStyles).toContain('@theme {');
  });

  it('protects apps/docs source files with restricted-import rules that enforce the package contract', () => {
    const biomeConfig = JSON.parse(readRepoFile('biome.json')) as {
      overrides?: Array<{
        includes?: string[];
        linter?: {
          rules?: {
            style?: {
              noRestrictedImports?: {
                options?: {
                  paths?: Record<string, string>;
                };
              };
            };
          };
        };
      }>;
    };

    const docsOverride = biomeConfig.overrides?.find((override) =>
      override.includes?.includes('apps/docs/src/**/*.{ts,tsx}'),
    );

    expect(docsOverride).toBeDefined();

    const restrictedPaths = docsOverride?.linter?.rules?.style?.noRestrictedImports?.options?.paths;

    expect(restrictedPaths?.['../../../packages/ui/src']).toContain('@adanft/ui');
    expect(restrictedPaths?.['../../../../packages/ui/src']).toContain('@adanft/ui');
    expect(restrictedPaths?.['../../../src/lib']).toContain('@adanft/ui');
    expect(restrictedPaths?.['../../components']).toContain('apps/docs');
  });
});
