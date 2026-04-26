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

declare const PUBLIC_COMPONENT_EXPORTS: PublicExports;

declare function createRootExports(): PackageExports;
declare function createPublishExports(): PackageExports;
declare function createViteEntries(options: ViteEntryOptions): Record<string, string>;

export { PUBLIC_COMPONENT_EXPORTS, createPublishExports, createRootExports, createViteEntries };
