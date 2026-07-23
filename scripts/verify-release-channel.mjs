import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const SUPPORTED_CHANNELS = new Set(['beta', 'latest']);

export function verifyReleaseChannel({ channel, version }) {
  if (!SUPPORTED_CHANNELS.has(channel)) {
    throw new Error(`Unsupported npm distribution tag: ${channel}.`);
  }

  const isPrerelease = version.includes('-');

  if (channel === 'latest' && isPrerelease) {
    throw new Error(`Cannot publish prerelease version ${version} with npm tag latest.`);
  }

  if (channel === 'beta' && !isPrerelease) {
    throw new Error(`Cannot publish stable version ${version} with npm tag beta.`);
  }

  return { channel, version };
}

export async function run({
  channel = process.argv[2],
  rootDir = process.cwd(),
  version = process.argv[3],
} = {}) {
  let releaseVersion = version;

  if (!releaseVersion) {
    const packageManifestPath = path.join(rootDir, 'packages/ui/package.json');
    let packageManifest;

    try {
      packageManifest = JSON.parse(await readFile(packageManifestPath, 'utf8'));
    } catch (error) {
      throw new Error(`Failed to read package manifest at ${packageManifestPath}.`, {
        cause: error,
      });
    }

    releaseVersion = packageManifest.version;
  }

  const result = verifyReleaseChannel({ channel, version: releaseVersion });
  console.log(`Release channel verified: ${result.version} -> ${result.channel}`);
  return result;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await run();
}
