import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, 'src');
const TARGET_EXTENSIONS = new Set(['.css', '.ts', '.tsx']);
const LEGACY_TOKEN_VARIABLES = [
  '--border-color',
  '--muted-color',
  '--text-color',
  '--title-color',
  '--primary-color',
  '--shadow-color',
  '--bg-primary-color',
  '--bg-second-color',
  '--danger-color',
  '--secondary-color',
  '--info-color',
  '--success-color',
  '--white-color',
  '--bg-third-color',
  '--bg-scroll',
  '--bg-hover-scroll',
  '--profile-bg',
  '--bg-transparent',
];
const LEGACY_UTILITY_CLASSES = [
  'bg-dark',
  'text-dark',
  'bg-light',
  'text-light',
  'bg-main-color',
  'bg-primary-color',
  'bg-secondary-color',
  'border-color',
  'shadow-personal',
  'box',
  'border-primary-color',
  'text-primary-color',
  'text-muted',
  'text-color',
];
const LEGACY_CLASS_EXCEPTIONS = new Set([path.join('src', 'lib', 'theme', 'utilities.css')]);

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

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

function createVarRegex() {
  const names = LEGACY_TOKEN_VARIABLES.map((name) => escapeRegExp(name)).join('|');
  return new RegExp(`var\\(\\s*(${names})\\s*[,)]`);
}

function createClassRegex() {
  const names = LEGACY_UTILITY_CLASSES.map((name) => escapeRegExp(name)).join('|');
  return new RegExp(`(^|[^a-zA-Z0-9_-])(${names})(?=[^a-zA-Z0-9_-]|$)`);
}

function validateContent(content, relativePath, varRegex, classRegex) {
  const errors = [];
  const lines = content.split(/\r?\n/);
  const allowLegacyClasses = LEGACY_CLASS_EXCEPTIONS.has(relativePath);

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];

    const varMatch = line.match(varRegex);
    if (varMatch) {
      errors.push({
        line: index + 1,
        message: `legacy token variable usage detected: ${varMatch[1]}`,
      });
    }

    if (!allowLegacyClasses) {
      const classMatch = line.match(classRegex);
      if (classMatch) {
        errors.push({
          line: index + 1,
          message: `legacy utility class usage detected: ${classMatch[2]}`,
        });
      }
    }
  }

  return errors;
}

async function run() {
  const files = await collectFiles(SRC_DIR);
  const varRegex = createVarRegex();
  const classRegex = createClassRegex();
  const errors = [];

  for (const filePath of files) {
    const content = await readFile(filePath, 'utf8');
    const relativePath = path.relative(ROOT, filePath);
    const fileErrors = validateContent(content, relativePath, varRegex, classRegex);

    if (fileErrors.length > 0) {
      errors.push({ relativePath, fileErrors });
    }
  }

  if (errors.length > 0) {
    console.error(
      'Semantic token validation failed. Use semantic token variables and ui-* utilities.',
    );

    for (const error of errors) {
      console.error(`- ${error.relativePath}`);
      for (const fileError of error.fileErrors) {
        console.error(`  - line ${fileError.line}: ${fileError.message}`);
      }
    }

    process.exitCode = 1;
    return;
  }

  console.log('Semantic token validation passed.');
}

run().catch((error) => {
  console.error('Semantic token validation crashed.');
  console.error(error);
  process.exitCode = 1;
});
