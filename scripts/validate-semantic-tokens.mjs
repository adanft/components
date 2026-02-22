import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { compareSemver, LEGACY_ALIAS_POLICY, readPackageVersion } from './legacy-alias-policy.mjs';

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
  'active',
];

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

function createVarDeclarationRegex() {
  const names = LEGACY_TOKEN_VARIABLES.map((name) => escapeRegExp(name)).join('|');
  return new RegExp(`(^|[^a-zA-Z0-9_-])(${names})\\s*:`);
}

function createCssClassRegex() {
  const names = LEGACY_UTILITY_CLASSES.map((name) => escapeRegExp(name)).join('|');
  return new RegExp(`\\.(${names})(?=[^a-zA-Z0-9_-]|$)`);
}

function createSourceClassRegex() {
  const names = LEGACY_UTILITY_CLASSES.map((name) => escapeRegExp(name)).join('|');
  return new RegExp(`(?:^|\\s)(${names})(?=\\s|$)`);
}

function validateContent(
  content,
  relativePath,
  varRegex,
  varDeclarationRegex,
  cssClassRegex,
  sourceClassRegex,
) {
  const errors = [];
  const lines = content.split(/\r?\n/);
  const allowlistedCompatibilityFile =
    LEGACY_ALIAS_POLICY.allowlistedCompatibilityFiles.has(relativePath);
  let isInsideCompatibilityBlock = false;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const lineNumber = index + 1;

    if (line.includes(LEGACY_ALIAS_POLICY.compatibilityBlockStart)) {
      if (isInsideCompatibilityBlock) {
        errors.push({
          line: lineNumber,
          message: `nested compatibility marker is not allowed: ${LEGACY_ALIAS_POLICY.compatibilityBlockStart}`,
        });
      }

      isInsideCompatibilityBlock = true;
      continue;
    }

    if (line.includes(LEGACY_ALIAS_POLICY.compatibilityBlockEnd)) {
      if (!isInsideCompatibilityBlock) {
        errors.push({
          line: lineNumber,
          message: `compatibility block end marker appears before a start marker: ${LEGACY_ALIAS_POLICY.compatibilityBlockEnd}`,
        });
      }

      isInsideCompatibilityBlock = false;
      continue;
    }

    const requiresCompatibilityBlock = !allowlistedCompatibilityFile || !isInsideCompatibilityBlock;

    const varMatch = line.match(varRegex);
    if (varMatch && requiresCompatibilityBlock) {
      errors.push({
        line: lineNumber,
        message: `legacy token variable usage detected: ${varMatch[1]}`,
      });
    }

    const varDeclarationMatch = line.match(varDeclarationRegex);
    if (varDeclarationMatch && requiresCompatibilityBlock) {
      errors.push({
        line: lineNumber,
        message: `legacy token variable declaration detected: ${varDeclarationMatch[2]}`,
      });
    }

    const isCssFile = path.extname(relativePath) === '.css';
    const classMatch =
      isCssFile || line.includes('className') || line.includes('class=')
        ? line.match(isCssFile ? cssClassRegex : sourceClassRegex)
        : null;
    if (classMatch && requiresCompatibilityBlock) {
      errors.push({
        line: lineNumber,
        message: `legacy utility class usage detected: ${classMatch[1]}`,
      });
    }
  }

  if (isInsideCompatibilityBlock) {
    errors.push({
      line: lines.length,
      message: `missing compatibility block end marker: ${LEGACY_ALIAS_POLICY.compatibilityBlockEnd}`,
    });
  }

  if (
    allowlistedCompatibilityFile &&
    !content.includes(LEGACY_ALIAS_POLICY.compatibilityBlockStart)
  ) {
    errors.push({
      line: 1,
      message: `allowlisted file is missing compatibility block start marker: ${LEGACY_ALIAS_POLICY.compatibilityBlockStart}`,
    });
  }

  if (
    allowlistedCompatibilityFile &&
    !content.includes(LEGACY_ALIAS_POLICY.compatibilityBlockEnd)
  ) {
    errors.push({
      line: 1,
      message: `allowlisted file is missing compatibility block end marker: ${LEGACY_ALIAS_POLICY.compatibilityBlockEnd}`,
    });
  }

  if (
    !allowlistedCompatibilityFile &&
    (content.includes(LEGACY_ALIAS_POLICY.compatibilityBlockStart) ||
      content.includes(LEGACY_ALIAS_POLICY.compatibilityBlockEnd))
  ) {
    errors.push({
      line: 1,
      message: 'compatibility block markers are only allowed in policy allowlisted files.',
    });
  }

  return errors;
}

async function run() {
  const packageVersion = await readPackageVersion();
  const files = await collectFiles(SRC_DIR);
  const varRegex = createVarRegex();
  const varDeclarationRegex = createVarDeclarationRegex();
  const cssClassRegex = createCssClassRegex();
  const sourceClassRegex = createSourceClassRegex();
  const errors = [];
  let compatibilityLegacyAliasCount = 0;

  for (const filePath of files) {
    const content = await readFile(filePath, 'utf8');
    const relativePath = path.relative(ROOT, filePath);
    const fileErrors = validateContent(
      content,
      relativePath,
      varRegex,
      varDeclarationRegex,
      cssClassRegex,
      sourceClassRegex,
    );

    if (LEGACY_ALIAS_POLICY.allowlistedCompatibilityFiles.has(relativePath)) {
      const compatibilityContentRegex = new RegExp(
        `${escapeRegExp(LEGACY_ALIAS_POLICY.compatibilityBlockStart)}([\\s\\S]*?)${escapeRegExp(LEGACY_ALIAS_POLICY.compatibilityBlockEnd)}`,
        'g',
      );
      const compatibilityBlocks = [...content.matchAll(compatibilityContentRegex)];
      for (const block of compatibilityBlocks) {
        const blockText = block[1] ?? '';
        for (const token of LEGACY_TOKEN_VARIABLES) {
          if (blockText.includes(token)) {
            compatibilityLegacyAliasCount += 1;
          }
        }
        for (const legacyClass of LEGACY_UTILITY_CLASSES) {
          if (blockText.includes(legacyClass)) {
            compatibilityLegacyAliasCount += 1;
          }
        }
      }
    }

    if (fileErrors.length > 0) {
      errors.push({ relativePath, fileErrors });
    }
  }

  const removalVersionReached =
    compareSemver(packageVersion, LEGACY_ALIAS_POLICY.removalVersion) >= 0;
  if (removalVersionReached && compatibilityLegacyAliasCount > 0) {
    errors.push({
      relativePath: path.join('package.json'),
      fileErrors: [
        {
          line: 1,
          message: `legacy alias compatibility blocks must be removed at ${LEGACY_ALIAS_POLICY.removalVersion} or later. Current version: ${packageVersion}`,
        },
      ],
    });
  }

  if (errors.length > 0) {
    console.error(
      'Semantic token validation failed. Use semantic token variables and ui-* utilities; keep legacy aliases inside explicit compatibility blocks only.',
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

  console.log(
    `Semantic token validation passed (package version ${packageVersion}, legacy removal target ${LEGACY_ALIAS_POLICY.removalVersion}).`,
  );
}

run().catch((error) => {
  console.error('Semantic token validation crashed.');
  console.error(error);
  process.exitCode = 1;
});
