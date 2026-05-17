import { docsSidebarNavigation } from './sidebar-navigation';

const DEFAULT_SEARCH_LIMIT = 6;
const EXACT_NAME_MATCH_SCORE = 100;
const PREFIX_NAME_MATCH_SCORE = 80;
const CONTAINS_NAME_MATCH_SCORE = 60;
const KEYWORD_MATCH_SCORE = 40;
const SUBPATH_MATCH_SCORE = 35;
const DESCRIPTION_MATCH_SCORE = 25;
const SECTION_MATCH_SCORE = 10;

type DocsSearchEntry = {
  description: string;
  href: string;
  keywords: string[];
  name: string;
  section: string;
  subpaths: string[];
};

type SearchableFields = Pick<
  DocsSearchEntry,
  'description' | 'keywords' | 'name' | 'section' | 'subpaths'
>;

const searchMetadataByHref: Record<
  string,
  Pick<DocsSearchEntry, 'description' | 'keywords' | 'subpaths'>
> = {
  '/components/accordion': {
    description: 'Collapsible content sections for progressive disclosure.',
    keywords: ['collapse', 'expand', 'disclosure', 'faq', 'primitive'],
    subpaths: ['@adanft/ui/accordion'],
  },
  '/components/alert': {
    description: 'Status messages and contextual feedback for important information.',
    keywords: ['feedback', 'message', 'status', 'notice', 'warning', 'error', 'success'],
    subpaths: ['@adanft/ui/alert'],
  },
  '/components/avatar': {
    description: 'User image and fallback identity display.',
    keywords: ['user', 'profile', 'picture', 'photo', 'identity'],
    subpaths: ['@adanft/ui/avatar'],
  },
  '/components/badge': {
    description: 'Compact labels for status, metadata, and counts.',
    keywords: ['feedback', 'label', 'tag', 'status', 'pill', 'count'],
    subpaths: ['@adanft/ui/badge'],
  },
  '/components/box': {
    description: 'Layout container primitive for grouping content.',
    keywords: ['layout', 'container', 'surface', 'card', 'component'],
    subpaths: ['@adanft/ui/box'],
  },
  '/components/breadcrumbs': {
    description: 'Hierarchical navigation trail for page location.',
    keywords: ['navigation', 'nav', 'trail', 'path', 'hierarchy'],
    subpaths: ['@adanft/ui/breadcrumbs'],
  },
  '/components/button': {
    description: 'Action trigger for forms, navigation, and commands.',
    keywords: ['action', 'cta', 'submit', 'click', 'control', 'component'],
    subpaths: ['@adanft/ui/button'],
  },
  '/components/checkbox': {
    description: 'Boolean selection input for forms and settings.',
    keywords: ['form', 'input', 'field', 'select', 'toggle', 'checked'],
    subpaths: ['@adanft/ui/checkbox'],
  },
  '/components/dropdown-menu': {
    description: 'Menu of actions shown from a trigger.',
    keywords: ['overlay', 'popover', 'tooltip', 'dropdown', 'menu', 'actions', 'navigation'],
    subpaths: ['@adanft/ui/dropdown-menu'],
  },
  '/components/field': {
    description: 'Form field wrapper for labels, controls, and messages.',
    keywords: ['form', 'input', 'select', 'textarea', 'label', 'validation', 'message'],
    subpaths: ['@adanft/ui/field'],
  },
  '/components/input': {
    description: 'Text entry control for forms.',
    keywords: ['form', 'field', 'text', 'control', 'textbox', 'search'],
    subpaths: ['@adanft/ui/input'],
  },
  '/components/label': {
    description: 'Accessible text label for form controls.',
    keywords: ['form', 'field', 'input', 'select', 'textarea', 'accessibility'],
    subpaths: ['@adanft/ui/label'],
  },
  '/components/modal': {
    description: 'Dialog overlay for focused tasks and confirmations.',
    keywords: ['dialog', 'modal', 'overlay', 'popup', 'confirm', 'focus'],
    subpaths: ['@adanft/ui/modal'],
  },
  '/components/pagination': {
    description: 'Navigation controls for paged collections.',
    keywords: ['navigation', 'pages', 'next', 'previous', 'list'],
    subpaths: ['@adanft/ui/pagination'],
  },
  '/components/popover': {
    description: 'Floating overlay for contextual content.',
    keywords: ['overlay', 'tooltip', 'dropdown', 'floating', 'popup', 'primitive'],
    subpaths: ['@adanft/ui/popover'],
  },
  '/components/profile': {
    description: 'User profile summary and account display.',
    keywords: ['user', 'avatar', 'account', 'identity', 'card'],
    subpaths: ['@adanft/ui/profile'],
  },
  '/components/radio-group': {
    description: 'Single-choice selection group for forms.',
    keywords: ['form', 'input', 'field', 'select', 'option', 'choice'],
    subpaths: ['@adanft/ui/radio-group'],
  },
  '/components/select': {
    description: 'Selection control for choosing from a list of options.',
    keywords: ['form', 'input', 'field', 'dropdown', 'option', 'combobox'],
    subpaths: ['@adanft/ui/select'],
  },
  '/components/sidebar': {
    description: 'Side navigation layout for application sections.',
    keywords: ['navigation', 'nav', 'menu', 'layout', 'panel'],
    subpaths: ['@adanft/ui/sidebar'],
  },
  '/components/skeleton': {
    description: 'Placeholder loading state for content that is not ready yet.',
    keywords: ['loading', 'placeholder', 'spinner', 'shimmer', 'pending'],
    subpaths: ['@adanft/ui/skeleton'],
  },
  '/components/spinner': {
    description: 'Circular loading indicator for pending work.',
    keywords: ['loading', 'loader', 'progress', 'skeleton', 'busy'],
    subpaths: ['@adanft/ui/spinner'],
  },
  '/components/switch': {
    description: 'On/off control for settings and preferences.',
    keywords: ['form', 'input', 'toggle', 'setting', 'checked'],
    subpaths: ['@adanft/ui/switch'],
  },
  '/components/table': {
    description: 'Structured data display with rows and columns.',
    keywords: ['data', 'grid', 'rows', 'columns', 'component'],
    subpaths: ['@adanft/ui/table'],
  },
  '/components/tabs': {
    description: 'Navigation between related panels of content.',
    keywords: ['navigation', 'nav', 'panel', 'section', 'primitive'],
    subpaths: ['@adanft/ui/tabs'],
  },
  '/components/textarea': {
    description: 'Multi-line text entry control for forms.',
    keywords: ['form', 'input', 'field', 'text', 'message', 'control'],
    subpaths: ['@adanft/ui/textarea'],
  },
  '/components/theme-switch': {
    description: 'Theme toggle for light and dark mode.',
    keywords: ['theme', 'dark mode', 'light mode', 'switch', 'toggle', 'appearance'],
    subpaths: ['@adanft/ui/theme-switch', '@adanft/ui/theme'],
  },
  '/components/tooltip': {
    description: 'Small contextual hint shown near a trigger.',
    keywords: ['overlay', 'popover', 'hint', 'help', 'floating', 'primitive'],
    subpaths: ['@adanft/ui/tooltip'],
  },
};

function normalizeSearchText(value: string) {
  return value.trim().toLowerCase();
}

function fieldContainsValue(values: string[], query: string) {
  return values.some((value) => normalizeSearchText(value).includes(query));
}

function getSearchScore(entry: SearchableFields, query: string) {
  const name = normalizeSearchText(entry.name);

  if (name === query) {
    return EXACT_NAME_MATCH_SCORE;
  }

  if (name.startsWith(query)) {
    return PREFIX_NAME_MATCH_SCORE;
  }

  if (name.includes(query)) {
    return CONTAINS_NAME_MATCH_SCORE;
  }

  if (fieldContainsValue(entry.keywords, query)) {
    return KEYWORD_MATCH_SCORE;
  }

  if (fieldContainsValue(entry.subpaths, query)) {
    return SUBPATH_MATCH_SCORE;
  }

  if (normalizeSearchText(entry.description).includes(query)) {
    return DESCRIPTION_MATCH_SCORE;
  }

  if (normalizeSearchText(entry.section).includes(query)) {
    return SECTION_MATCH_SCORE;
  }

  return 0;
}

function createDocsSearchIndex(): DocsSearchEntry[] {
  let currentSection = '';
  const entries: DocsSearchEntry[] = [];

  for (const node of docsSidebarNavigation) {
    if (node.type === 'heading') {
      currentSection = node.text;
      continue;
    }

    if (node.type === 'group') {
      for (const item of node.items) {
        const metadata = searchMetadataByHref[item.href];

        entries.push({
          description: metadata?.description ?? '',
          href: item.href,
          keywords: metadata?.keywords ?? [],
          name: item.text,
          section: node.text,
          subpaths: metadata?.subpaths ?? [],
        });
      }

      continue;
    }

    const metadata = searchMetadataByHref[node.href];

    entries.push({
      description: metadata?.description ?? '',
      href: node.href,
      keywords: metadata?.keywords ?? [],
      name: node.text,
      section: currentSection,
      subpaths: metadata?.subpaths ?? [],
    });
  }

  return entries;
}

function searchDocs(query: string, index: DocsSearchEntry[], limit = DEFAULT_SEARCH_LIMIT) {
  const normalizedQuery = normalizeSearchText(query);
  const resultLimit = Math.max(0, limit);

  if (!normalizedQuery || resultLimit === 0) {
    return [];
  }

  return index
    .map((entry, position) => ({ entry, position, score: getSearchScore(entry, normalizedQuery) }))
    .filter(({ score }) => score > 0)
    .sort((left, right) => right.score - left.score || left.position - right.position)
    .slice(0, resultLimit)
    .map(({ entry }) => entry);
}

const docsSearchIndex = createDocsSearchIndex();

export type { DocsSearchEntry };
export { docsSearchIndex, searchDocs };
