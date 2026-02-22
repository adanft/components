const DOCS_BASE_PATH = '/components';

const docsPath = (path: string) => `${DOCS_BASE_PATH}${path}`;

const DOCS_HOME_PATH = DOCS_BASE_PATH;
const DOCS_NOT_FOUND_PATH = docsPath('/*');

export { DOCS_BASE_PATH, DOCS_HOME_PATH, DOCS_NOT_FOUND_PATH, docsPath };
