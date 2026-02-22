function normalizeDocsBasePath(basePath: string) {
  if (basePath === '/') {
    return '';
  }

  const withLeadingSlash = basePath.startsWith('/') ? basePath : `/${basePath}`;
  return withLeadingSlash.endsWith('/') ? withLeadingSlash.slice(0, -1) : withLeadingSlash;
}

const DOCS_BASE_PATH = normalizeDocsBasePath(import.meta.env.BASE_URL);

function docsPath(path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${DOCS_BASE_PATH}${normalizedPath}`;
}

const DOCS_HOME_PATH = DOCS_BASE_PATH || '/';
const DOCS_NOT_FOUND_PATH = docsPath('/*');

export { DOCS_BASE_PATH, DOCS_HOME_PATH, DOCS_NOT_FOUND_PATH, docsPath };
