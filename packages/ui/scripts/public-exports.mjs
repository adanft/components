const PUBLIC_COMPONENT_EXPORTS = {
  accordion: {
    source: 'components/accordion/index',
    types: 'components/accordion/index.d.ts',
  },
  alert: {
    source: 'components/alert/index',
    types: 'components/alert/index.d.ts',
  },
  avatar: {
    source: 'components/avatar',
    types: 'components/avatar.d.ts',
  },
  badge: {
    source: 'components/badge',
    types: 'components/badge.d.ts',
  },
  box: {
    source: 'components/box',
    types: 'components/box.d.ts',
  },
  button: {
    source: 'components/button',
    types: 'components/button.d.ts',
  },
  checkbox: {
    source: 'components/checkbox',
    types: 'components/checkbox.d.ts',
  },
  'dropdown-menu': {
    source: 'components/dropdown-menu/index',
    types: 'components/dropdown-menu/index.d.ts',
  },
  field: {
    source: 'components/field/index',
    types: 'components/field/index.d.ts',
  },
  input: {
    source: 'components/input',
    types: 'components/input.d.ts',
  },
  label: {
    source: 'components/label',
    types: 'components/label.d.ts',
  },
  modal: {
    source: 'components/modal/index',
    types: 'components/modal/index.d.ts',
  },
  'pagination-foot': {
    source: 'components/pagination/foot',
    types: 'components/pagination/foot.d.ts',
  },
  'pagination-head': {
    source: 'components/pagination/head',
    types: 'components/pagination/head.d.ts',
  },
  popover: {
    source: 'components/popover/index',
    types: 'components/popover/index.d.ts',
  },
  profile: {
    source: 'components/profile',
    types: 'components/profile.d.ts',
  },
  'radio-group': {
    source: 'components/radio-group/index',
    types: 'components/radio-group/index.d.ts',
  },
  select: {
    source: 'components/select',
    types: 'components/select.d.ts',
  },
  sidebar: {
    source: 'components/sidebar/index',
    types: 'components/sidebar/index.d.ts',
  },
  skeleton: {
    source: 'components/skeleton',
    types: 'components/skeleton.d.ts',
  },
  switch: {
    source: 'components/switch',
    types: 'components/switch.d.ts',
  },
  table: {
    source: 'components/table/index',
    types: 'components/table/index.d.ts',
  },
  tabs: {
    source: 'components/tabs/index',
    types: 'components/tabs/index.d.ts',
  },
  'theme-switch': {
    source: 'components/theme-switch',
    types: 'components/theme-switch.d.ts',
  },
  tooltip: {
    source: 'components/tooltip/index',
    types: 'components/tooltip/index.d.ts',
  },
};

function createRootExports() {
  return {
    '.': {
      types: './src/index.ts',
      import: './src/index.ts',
      default: './src/index.ts',
    },
    ...Object.fromEntries(
      Object.entries(PUBLIC_COMPONENT_EXPORTS).map(([publicName, contract]) => {
        const sourcePath = `./src/${contract.source}.tsx`;

        return [
          `./${publicName}`,
          {
            types: sourcePath,
            import: sourcePath,
            default: sourcePath,
          },
        ];
      }),
    ),
    './styles.css': './styles.css',
  };
}

function createPublishExports() {
  return {
    '.': {
      types: './dist/index.d.ts',
      import: './dist/index.js',
      default: './dist/index.js',
    },
    ...Object.fromEntries(
      Object.entries(PUBLIC_COMPONENT_EXPORTS).map(([publicName, contract]) => {
        const importPath = `./dist/components/${publicName}/index.js`;

        return [
          `./${publicName}`,
          {
            types: `./dist/${contract.types}`,
            import: importPath,
            default: importPath,
          },
        ];
      }),
    ),
    './styles.css': './dist/styles.css',
  };
}

function createViteEntries({ resolveSource }) {
  return Object.fromEntries(
    Object.entries(PUBLIC_COMPONENT_EXPORTS).map(([publicName, contract]) => [
      `components/${publicName}/index`,
      resolveSource(`${contract.source}.tsx`),
    ]),
  );
}

export { PUBLIC_COMPONENT_EXPORTS, createPublishExports, createRootExports, createViteEntries };
