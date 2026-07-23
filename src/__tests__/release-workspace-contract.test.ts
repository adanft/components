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

    await expect(readPackageVersion()).resolves.toBe('0.2.0-beta.6');
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
    expect(packageJson.scripts?.['release:latest']).toContain('verify-release-channel.mjs latest');
    expect(packageJson.scripts?.['release:latest']).toContain('packages/ui');
    expect(packageJson.scripts?.['release:beta']).toContain('verify-release-channel.mjs beta');
    expect(packageJson.scripts?.['release:beta']).toContain('packages/ui');
    expect(packageJson.scripts?.['release:beta']).toContain('validate:pack-contract');
    expect(packageJson.scripts?.['release:beta']).toContain('changeset publish --tag beta');
  });

  it('splits validation and release workflows', () => {
    expect(existsSync(path.join(repoRoot, '.github/workflows/validate.yml'))).toBe(true);
    expect(existsSync(path.join(repoRoot, '.github/workflows/release.yml'))).toBe(true);
    expect(existsSync(path.join(repoRoot, '.github/workflows/docs-deploy.yml'))).toBe(true);
    expect(existsSync(path.join(repoRoot, '.github/workflows/deploy.yml'))).toBe(false);

    const releaseWorkflow = readRepoFile('.github/workflows/release.yml');
    const distTagWorkflow = readRepoFile('.github/workflows/npm-dist-tag.yml');

    expect(releaseWorkflow).toContain('default: beta');
    expect(releaseWorkflow).toContain('publish: pnpm release:$' + '{{ inputs.channel }}');
    expect(releaseWorkflow).not.toContain('publish: pnpm release:latest');
    expect(distTagWorkflow).toContain('default: 0.2.0-beta.6');
    expect(distTagWorkflow).toContain('default: beta');
    expect(distTagWorkflow).toContain('verify-release-channel.mjs');
  });

  it('retargets validation scripts to packages and apps boundaries', () => {
    expect(readRepoFile('scripts/validate-docs-imports.mjs')).toContain('apps/docs');
    expect(readRepoFile('scripts/validate-docs-imports.mjs')).toContain('@adanft/ui');
    expect(readRepoFile('scripts/validate-semantic-tokens.mjs')).toContain('packages/ui');
    expect(readRepoFile('scripts/legacy-alias-policy.mjs')).toContain('packages/ui');
  });

  it('rejects npm distribution tags that do not match the package version', async () => {
    const { verifyReleaseChannel } = await import('../../scripts/verify-release-channel.mjs');

    expect(() => verifyReleaseChannel({ channel: 'beta', version: '0.2.0-beta.6' })).not.toThrow();
    expect(() => verifyReleaseChannel({ channel: 'latest', version: '0.2.0' })).not.toThrow();
    expect(() => verifyReleaseChannel({ channel: 'latest', version: '0.2.0-beta.6' })).toThrow(
      'Cannot publish prerelease version 0.2.0-beta.6 with npm tag latest.',
    );
    expect(() => verifyReleaseChannel({ channel: 'beta', version: '0.2.0' })).toThrow(
      'Cannot publish stable version 0.2.0 with npm tag beta.',
    );
  });

  it('verifies the pack and publish contract before beta release', async () => {
    const { verifyPackContract } = await import('../../scripts/verify-pack-contract.mjs');

    const verification = verifyPackContract({ requireBuiltArtifacts: false, rootDir: repoRoot });

    expect(verification.ok).toBe(true);
    expect(verification.checks.every((check: { ok: boolean }) => check.ok)).toBe(true);
  });
});
