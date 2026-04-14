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
const DOCS_ACCORDION_PATH = '/components/accordion';
const DOCS_BUTTON_PATH = '/components/button';
const DOCS_BOX_PATH = '/components/box';
const DOCS_INPUT_FIELD_PATH = '/components/input-field';
const DOCS_MODAL_PATH = '/components/modal';
const DOCS_PAGINATION_PATH = '/components/pagination';
const DOCS_POPOVER_PATH = '/components/popover';
const DOCS_PROFILE_PATH = '/components/profile';
const DOCS_RADIO_GROUP_PATH = '/components/radio-group';
const DOCS_SIDEBAR_PATH = '/components/sidebar';
const DOCS_SWITCH_PATH = '/components/switch';
const DOCS_TABLE_PATH = '/components/table';
const DOCS_TABS_PATH = '/components/tabs';
const DOCS_TOOLTIP_PATH = '/components/tooltip';
const DOCS_CHECKBOX_PATH = '/components/checkbox';
const DOCS_THEME_SWITCH_PATH = '/components/theme-switch';
const DOCS_NOT_FOUND_PATH = docsPath('/*');

export {
  DOCS_ACCORDION_PATH,
  DOCS_BASE_PATH,
  DOCS_BOX_PATH,
  DOCS_BUTTON_PATH,
  DOCS_CHECKBOX_PATH,
  DOCS_HOME_PATH,
  DOCS_INPUT_FIELD_PATH,
  DOCS_MODAL_PATH,
  DOCS_NOT_FOUND_PATH,
  DOCS_PAGINATION_PATH,
  DOCS_POPOVER_PATH,
  DOCS_PROFILE_PATH,
  DOCS_RADIO_GROUP_PATH,
  DOCS_SIDEBAR_PATH,
  DOCS_SWITCH_PATH,
  DOCS_TABLE_PATH,
  DOCS_TABS_PATH,
  DOCS_THEME_SWITCH_PATH,
  DOCS_TOOLTIP_PATH,
  docsPath,
};
