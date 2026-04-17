import { readFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const PACKAGE_JSON_PATH = path.join(ROOT, 'packages', 'ui', 'package.json');
const UI_WORKSPACE = 'packages/ui';

export const LEGACY_ALIAS_POLICY = {
  deprecatedSince: '1.0.0',
  internalBlockSince: '1.0.0',
  removalVersion: '2.0.0',
  allowlistedCompatibilityFiles: new Set([
    path.join(UI_WORKSPACE, 'src', 'theme', 'utilities.css'),
  ]),
  compatibilityBlockStart: 'legacy-compat:start',
  compatibilityBlockEnd: 'legacy-compat:end',
};

function parseSemver(value) {
  const match = value.trim().match(/^(\d+)\.(\d+)\.(\d+)/);
  if (!match) {
    throw new Error(`Invalid semver value: "${value}".`);
  }

  return match.slice(1).map((part) => Number(part));
}

export function compareSemver(left, right) {
  const [leftMajor, leftMinor, leftPatch] = parseSemver(left);
  const [rightMajor, rightMinor, rightPatch] = parseSemver(right);

  if (leftMajor !== rightMajor) {
    return leftMajor - rightMajor;
  }

  if (leftMinor !== rightMinor) {
    return leftMinor - rightMinor;
  }

  return leftPatch - rightPatch;
}

export async function readPackageVersion() {
  const packageJson = JSON.parse(await readFile(PACKAGE_JSON_PATH, 'utf8'));
  return packageJson.version;
}
