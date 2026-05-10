import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

import { createPublishExports, createRootExports } from '../packages/ui/scripts/public-exports.mjs';

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, 'utf8'));
}

function createCheck(name, ok, details) {
  return { name, ok, details };
}

function verifySubpathExports(exportsMap, rootDir, { requireBuiltArtifacts }) {
  return Object.entries(createPublishExports())
    .filter(([subpath]) => subpath !== '.' && subpath !== './styles.css')
    .flatMap(([subpath, expected]) => {
      const actual = exportsMap[subpath];
      const manifestMatches =
        actual?.types === expected.types &&
        actual?.import === expected.import &&
        actual?.default === expected.default;
      const artifactPaths = [expected.types, expected.import].map((artifactPath) =>
        path.join(rootDir, 'packages/ui', artifactPath),
      );
      const artifactsExist = artifactPaths.every((artifactPath) => existsSync(artifactPath));

      return [
        createCheck(
          `publishConfig exposes ${subpath} built artifacts`,
          manifestMatches,
          `expected=${JSON.stringify(expected)}; actual=${JSON.stringify(actual)}`,
        ),
        createCheck(
          `built artifacts exist for ${subpath}`,
          requireBuiltArtifacts ? artifactsExist : true,
          artifactPaths.join(', '),
        ),
      ];
    });
}

export function verifyPackContract({ requireBuiltArtifacts = true, rootDir = process.cwd() } = {}) {
  const packageManifestPath = path.join(rootDir, 'packages/ui/package.json');
  const rootManifestPath = path.join(rootDir, 'package.json');
  const releaseWorkflowPath = path.join(rootDir, '.github/workflows/release.yml');
  const packageStylesPath = path.join(rootDir, 'packages/ui/styles.css');
  const packageSourceStylesPath = path.join(rootDir, 'packages/ui/src/styles.css');
  const packageBuildConfigPath = path.join(rootDir, 'packages/ui/tsconfig.build.json');

  const packageManifest = readJson(packageManifestPath);
  const packageBuildConfig = readJson(packageBuildConfigPath);
  const rootManifest = readJson(rootManifestPath);
  const releaseWorkflow = readFileSync(releaseWorkflowPath, 'utf8');
  const packageSourceStyles = readFileSync(packageSourceStylesPath, 'utf8');

  const files = Array.isArray(packageManifest.files) ? packageManifest.files : [];
  const exportsMap = packageManifest.publishConfig?.exports ?? {};
  const expectedRootExports = createRootExports();
  const expectedPublishExports = createPublishExports();
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
      JSON.stringify(exportsMap) === JSON.stringify(expectedPublishExports),
      JSON.stringify(exportsMap),
    ),
    createCheck(
      'local exports are synchronized from the public export contract',
      JSON.stringify(packageManifest.exports) === JSON.stringify(expectedRootExports),
      JSON.stringify(packageManifest.exports),
    ),
    createCheck(
      'package build emits declarations after vite clears dist',
      packageManifest.scripts?.build?.includes('pnpm exec vite build && pnpm exec tsc') === true &&
        packageBuildConfig.compilerOptions?.declaration === true &&
        packageBuildConfig.compilerOptions?.emitDeclarationOnly === true &&
        packageBuildConfig.compilerOptions?.outDir === './dist',
      `build=${packageManifest.scripts?.build}; tsconfig=${JSON.stringify(
        packageBuildConfig.compilerOptions,
      )}`,
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
        packageSourceStyles.includes('@theme {') &&
        packageSourceStyles.includes('@layer base {') &&
        packageSourceStyles.includes('@keyframes tilt') &&
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
    ...verifySubpathExports(exportsMap, rootDir, { requireBuiltArtifacts }),
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
