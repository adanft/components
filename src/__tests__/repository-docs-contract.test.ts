import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

const repoRoot = path.resolve(import.meta.dirname, '../..');

function readRepoFile(relativePath: string) {
  return readFileSync(path.join(repoRoot, relativePath), 'utf8');
}

describe('repository documentation contract', () => {
  it('documents the real monorepo layout in RESUME.md', () => {
    const resume = readRepoFile('RESUME.md');

    expect(resume).toContain('`packages/ui`');
    expect(resume).toContain('`apps/docs`');
    expect(resume).toContain('`@adanft/ui`');
    expect(resume).not.toContain('`src/lib`');
    expect(resume).not.toContain('`src/docs`');
  });

  it('removes the stale legacy alias migration matrix during beta stabilization', () => {
    expect(existsSync(path.join(repoRoot, 'docs/migrations/legacy-alias-matrix.md'))).toBe(false);
  });
});
