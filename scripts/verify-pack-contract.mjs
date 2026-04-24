import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, 'utf8'));
}

function createCheck(name, ok, details) {
  return { name, ok, details };
}

export function verifyPackContract({ rootDir = process.cwd() } = {}) {
  const packageManifestPath = path.join(rootDir, 'packages/ui/package.json');
  const rootManifestPath = path.join(rootDir, 'package.json');
  const releaseWorkflowPath = path.join(rootDir, '.github/workflows/release.yml');
  const packageReadmePath = path.join(rootDir, 'packages/ui/README.md');
  const packageStylesPath = path.join(rootDir, 'packages/ui/styles.css');
  const packageSourceStylesPath = path.join(rootDir, 'packages/ui/src/styles.css');

  const packageManifest = readJson(packageManifestPath);
  const rootManifest = readJson(rootManifestPath);
  const releaseWorkflow = readFileSync(releaseWorkflowPath, 'utf8');
  const packageReadme = readFileSync(packageReadmePath, 'utf8');
  const packageSourceStyles = readFileSync(packageSourceStylesPath, 'utf8');

  const files = Array.isArray(packageManifest.files) ? packageManifest.files : [];
  const exportsMap = packageManifest.publishConfig?.exports ?? {};
  const scripts = rootManifest.scripts ?? {};

  const checks = [
    createCheck(
      'ui package manifest targets the publishable contract',
      packageManifest.name === '@adanft/ui' && typeof packageManifest.version === 'string',
      `name=${packageManifest.name}, version=${packageManifest.version}`,
    ),
    createCheck(
      'packaged files are intentionally limited to dist output and README',
      files.includes('dist') && files.includes('README.md') && !files.includes('src'),
      `files=${JSON.stringify(files)}`,
    ),
    createCheck(
      'publishConfig exports point at built dist artifacts',
      exportsMap['.']?.types === './dist/index.d.ts' &&
        exportsMap['.']?.import === './dist/index.js' &&
        exportsMap['./styles.css'] === './dist/styles.css',
      JSON.stringify(exportsMap),
    ),
    createCheck(
      'package stylesheet proxy exists for the published styles subpath',
      existsSync(packageStylesPath),
      packageStylesPath,
    ),
    createCheck(
      'package build copies the public stylesheet contract into dist',
      packageManifest.scripts?.build?.includes('scripts/copy-styles.mjs') === true &&
        existsSync(path.join(rootDir, 'packages/ui/scripts/copy-styles.mjs')),
      `build=${packageManifest.scripts?.build}`,
    ),
    createCheck(
      'public package stylesheet carries dependency CSS and theme sources',
      packageSourceStyles.includes('@import "simplebar-react/dist/simplebar.min.css";') &&
        packageSourceStyles.includes('@import "./theme/utilities.css";') &&
        packageSourceStyles.includes('@theme {') &&
        !packageSourceStyles.includes('@import "tailwindcss";'),
      packageSourceStyles,
    ),
    createCheck(
      'workspace exposes a dedicated pack contract validator',
      typeof scripts['validate:pack-contract'] === 'string' &&
        scripts.validate?.includes('validate:pack-contract') === true,
      `validate:pack-contract=${scripts['validate:pack-contract']}; validate=${scripts.validate}`,
    ),
    createCheck(
      'release workflow runs the pack contract guardrail before publish',
      releaseWorkflow.includes('pnpm release:latest') &&
        typeof scripts['release:latest'] === 'string' &&
        scripts['release:latest'].includes('validate:pack-contract') &&
        scripts['release:latest'].includes('packages/ui') &&
        scripts.release === 'changeset publish --tag latest',
      releaseWorkflow,
    ),
    createCheck(
      'package README documents the beta publish verification step',
      packageReadme.includes('pnpm validate:pack-contract') &&
        packageReadme.includes('beta release'),
      packageReadme,
    ),
  ];

  return {
    ok: checks.every((check) => check.ok),
    checks,
  };
}

export function run() {
  const verification = verifyPackContract();

  if (verification.ok) {
    console.log('Pack contract verification passed.');
    return verification;
  }

  console.error('Pack contract verification failed.');

  for (const check of verification.checks.filter((entry) => !entry.ok)) {
    console.error(`- ${check.name}`);
    console.error(`  ${check.details}`);
  }

  process.exitCode = 1;
  return verification;
}

if (import.meta.url === new URL(process.argv[1], 'file:').href) {
  run();
}
