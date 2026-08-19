import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import { afterEach, describe, expect, it } from 'vitest';

import { writeGeneratedSource } from './generate-highlighted-code.mjs';

const temporaryDirectories: string[] = [];

async function createOutputFile(content: string) {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'highlighted-code-'));
  temporaryDirectories.push(directory);
  const outputFile = path.join(directory, 'highlighted-code.ts');
  await writeFile(outputFile, content);
  return outputFile;
}

afterEach(async () => {
  await Promise.all(
    temporaryDirectories
      .splice(0)
      .map((directory) => rm(directory, { force: true, recursive: true })),
  );
});

describe('highlighted code generation', () => {
  it('accepts a current generated file without rewriting it', async () => {
    const outputFile = await createOutputFile('current\n');

    await expect(
      writeGeneratedSource({ check: true, generatedSource: 'current\n', outputFile }),
    ).resolves.toBeUndefined();
    await expect(readFile(outputFile, 'utf8')).resolves.toBe('current\n');
  });

  it('rejects a stale generated file without rewriting it', async () => {
    const outputFile = await createOutputFile('stale\n');

    await expect(
      writeGeneratedSource({ check: true, generatedSource: 'current\n', outputFile }),
    ).rejects.toThrow('Generated highlighted code is stale');
    await expect(readFile(outputFile, 'utf8')).resolves.toBe('stale\n');
  });

  it('updates generated output in write mode', async () => {
    const outputFile = await createOutputFile('stale\n');

    await writeGeneratedSource({ check: false, generatedSource: 'current\n', outputFile });

    await expect(readFile(outputFile, 'utf8')).resolves.toBe('current\n');
  });
});
