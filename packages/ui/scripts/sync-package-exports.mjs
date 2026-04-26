import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

import { createPublishExports, createRootExports } from './public-exports.mjs';

const packageManifestPath = path.resolve(import.meta.dirname, '../package.json');
const packageManifest = JSON.parse(readFileSync(packageManifestPath, 'utf8'));

packageManifest.exports = createRootExports();
packageManifest.publishConfig = {
  ...packageManifest.publishConfig,
  exports: createPublishExports(),
};

writeFileSync(packageManifestPath, `${JSON.stringify(packageManifest, null, 2)}\n`);
