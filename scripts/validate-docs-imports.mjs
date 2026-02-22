import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const DOCS_DIR = path.join(ROOT, 'src', 'docs');
const TARGET_EXTENSIONS = new Set(['.ts', '.tsx']);
const FORBIDDEN_SEGMENTS = [
  `${path.sep}src${path.sep}components${path.sep}`,
  `${path.sep}src${path.sep}helpers${path.sep}`,
  `${path.sep}src${path.sep}hooks${path.sep}`,
  `${path.sep}src${path.sep}pages${path.sep}`,
];

async function collectFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        return collectFiles(entryPath);
      }

      return TARGET_EXTENSIONS.has(path.extname(entryPath)) ? [entryPath] : [];
    }),
  );

  return files.flat();
}

function isRelativeImport(importPath) {
  return importPath.startsWith('.');
}

function resolvesForbidden(absoluteImportPath) {
  return FORBIDDEN_SEGMENTS.some((segment) => absoluteImportPath.includes(segment));
}

function toCandidatePaths(fromFile, importPath) {
  const absoluteBase = path.resolve(path.dirname(fromFile), importPath);
  const extension = path.extname(absoluteBase);

  if (extension) {
    return [absoluteBase];
  }

  return [
    `${absoluteBase}.ts`,
    `${absoluteBase}.tsx`,
    path.join(absoluteBase, 'index.ts'),
    path.join(absoluteBase, 'index.tsx'),
  ];
}

async function validateFile(filePath) {
  const content = await readFile(filePath, 'utf8');
  const importMatches = [...content.matchAll(/from\s+['"]([^'"]+)['"]/g)];
  const violations = [];

  for (const match of importMatches) {
    const importPath = match[1];

    if (!isRelativeImport(importPath)) {
      continue;
    }

    const candidates = toCandidatePaths(filePath, importPath);

    if (candidates.some((candidate) => resolvesForbidden(candidate))) {
      violations.push(importPath);
    }
  }

  return violations;
}

async function run() {
  const files = await collectFiles(DOCS_DIR);
  const errors = [];

  for (const filePath of files) {
    const violations = await validateFile(filePath);

    if (violations.length > 0) {
      errors.push({ filePath, violations });
    }
  }

  if (errors.length > 0) {
    console.error('Boundary validation failed: docs imports bypass public API.');

    for (const error of errors) {
      const relativeFile = path.relative(ROOT, error.filePath);
      console.error(`- ${relativeFile}`);
      for (const violation of error.violations) {
        console.error(`  - forbidden import: ${violation}`);
      }
    }

    process.exitCode = 1;
    return;
  }

  console.log('Boundary validation passed.');
}

run().catch((error) => {
  console.error('Boundary validation crashed.');
  console.error(error);
  process.exitCode = 1;
});
