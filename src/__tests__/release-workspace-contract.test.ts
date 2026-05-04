import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

const repoRoot = path.resolve(import.meta.dirname, '../..');

function readRepoFile(relativePath: string) {
  return readFileSync(path.join(repoRoot, relativePath), 'utf8');
}

describe('release workspace contract', () => {
  it('reads the legacy alias policy version from the publishable ui package manifest', async () => {
    const { readPackageVersion } = await import('../../scripts/legacy-alias-policy.mjs');

    await expect(readPackageVersion()).resolves.toBe('0.2.0-beta.1');
  });

  it('configures changesets and release scripts for the ui package only', () => {
    expect(existsSync(path.join(repoRoot, '.changeset/config.json'))).toBe(true);

    const packageJson = JSON.parse(readRepoFile('package.json')) as {
      scripts?: Record<string, string>;
    };

    expect(packageJson.scripts?.['changeset:version']).toBeDefined();
    expect(packageJson.scripts?.['validate:pack-contract']).toBeDefined();
    expect(packageJson.scripts?.validate).toContain('validate:pack-contract');
    expect(packageJson.scripts?.release).toContain('changeset publish --tag latest');
    expect(packageJson.scripts?.['release:latest']).toContain('packages/ui');
  });

  it('splits validation and release workflows', () => {
    expect(existsSync(path.join(repoRoot, '.github/workflows/validate.yml'))).toBe(true);
    expect(existsSync(path.join(repoRoot, '.github/workflows/release.yml'))).toBe(true);
    expect(existsSync(path.join(repoRoot, '.github/workflows/docs-deploy.yml'))).toBe(true);
    expect(existsSync(path.join(repoRoot, '.github/workflows/deploy.yml'))).toBe(false);
  });

  it('retargets validation scripts to packages and apps boundaries', () => {
    expect(readRepoFile('scripts/validate-docs-imports.mjs')).toContain('apps/docs');
    expect(readRepoFile('scripts/validate-docs-imports.mjs')).toContain('@adanft/ui');
    expect(readRepoFile('scripts/validate-semantic-tokens.mjs')).toContain('packages/ui');
    expect(readRepoFile('scripts/legacy-alias-policy.mjs')).toContain('packages/ui');
  });

  it('verifies the pack and publish contract before beta release', async () => {
    // @ts-expect-error Node ESM script imported for contract verification in tests.
    const { verifyPackContract } = await import('../../scripts/verify-pack-contract.mjs');

    const verification = verifyPackContract({ requireBuiltArtifacts: false, rootDir: repoRoot });

    expect(verification.ok).toBe(true);
    expect(verification.checks.every((check: { ok: boolean }) => check.ok)).toBe(true);
  });
});
