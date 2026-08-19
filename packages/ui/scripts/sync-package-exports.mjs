import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

import { createPublishExports, createRootExports } from './public-exports.mjs';

const packageManifestPath = path.resolve(import.meta.dirname, '../package.json');
const currentSource = readFileSync(packageManifestPath, 'utf8');
const packageManifest = JSON.parse(currentSource);

packageManifest.exports = createRootExports();
packageManifest.publishConfig = {
  ...packageManifest.publishConfig,
  exports: createPublishExports(),
};

const synchronizedSource = `${JSON.stringify(packageManifest, null, 2)}\n`;

if (process.argv.includes('--check')) {
  if (currentSource !== synchronizedSource) {
    console.error('Package export metadata is stale. Run `pnpm --dir packages/ui sync:exports`.');
    process.exitCode = 1;
  } else {
    console.log('Package export metadata is synchronized.');
  }
} else {
  writeFileSync(packageManifestPath, synchronizedSource);
  console.log('Synchronized package export metadata.');
}
