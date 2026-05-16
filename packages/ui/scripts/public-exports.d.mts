type PublicExportContract = {
  source: string;
  types: string;
};

type PublicExports = Record<string, PublicExportContract>;

type RootExportTarget = {
  default: string;
  import: string;
  types: string;
};

type PackageExports = Record<string, RootExportTarget | string>;

type ViteEntryOptions = {
  resolveSource: (sourcePath: string) => string;
};

declare const PUBLIC_SUBPATH_EXPORTS: PublicExports;

declare function createRootExports(): PackageExports;
declare function createPublishExports(): PackageExports;
declare function createViteEntries(options: ViteEntryOptions): Record<string, string>;

export { createPublishExports, createRootExports, createViteEntries, PUBLIC_SUBPATH_EXPORTS };
