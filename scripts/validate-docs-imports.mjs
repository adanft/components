import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const DOCS_WORKSPACE = 'apps/docs';
const DOCS_DIR = path.join(ROOT, DOCS_WORKSPACE, 'src');
const TARGET_EXTENSIONS = new Set(['.ts', '.tsx']);
const FORBIDDEN_PATHS = [
  path.join(ROOT, 'packages', 'ui', 'src'),
  path.join(ROOT, 'src', 'lib'),
  path.join(ROOT, 'src', 'components'),
  path.join(ROOT, 'src', 'hooks'),
  path.join(ROOT, 'src', 'pages'),
];
const REQUIRED_PACKAGE_IMPORT = '@adanft/ui';

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
  return FORBIDDEN_PATHS.some((forbiddenPath) => absoluteImportPath.startsWith(forbiddenPath));
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
  const packageImportSeen = content.includes(REQUIRED_PACKAGE_IMPORT);

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

  if (
    filePath.includes(`${path.sep}pages${path.sep}`) &&
    !packageImportSeen &&
    !filePath.endsWith(`${path.sep}home.tsx`) &&
    !filePath.endsWith(`${path.sep}code-block.tsx`)
  ) {
    violations.push(`missing required package import: ${REQUIRED_PACKAGE_IMPORT}`);
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
