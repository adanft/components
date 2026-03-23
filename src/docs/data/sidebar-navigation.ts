import {
  DOCS_BOX_PATH,
  DOCS_BUTTON_PATH,
  DOCS_ICON_PATH,
  DOCS_INPUT_FIELD_PATH,
  DOCS_MODAL_PATH,
  DOCS_PROFILE_PATH,
  DOCS_SIDEBAR_PATH,
  DOCS_TABLE_PATH,
  docsPath,
} from './routes';

type DocsSidebarNavigationLinkNode = {
  href: string;
  nfIconName: string;
  text: string;
  type: 'link';
};

type DocsSidebarNavigationGroupNode = {
  children: DocsSidebarNavigationNode[];
  iconName: string;
  text: string;
  type: 'group';
};

type DocsSidebarNavigationHeadingNode = {
  text: string;
  type: 'heading';
};

type DocsSidebarNavigationNode =
  | DocsSidebarNavigationGroupNode
  | DocsSidebarNavigationHeadingNode
  | DocsSidebarNavigationLinkNode;

const docsSidebarNavigation: DocsSidebarNavigationNode[] = [
  { type: 'link', nfIconName: 'nf-fa-hand_pointer_o', text: 'Button', href: DOCS_BUTTON_PATH },
  { type: 'link', nfIconName: 'nf-md-view_agenda_outline', text: 'Box', href: DOCS_BOX_PATH },
  { type: 'link', nfIconName: 'nf-md-image_outline', text: 'Icon', href: DOCS_ICON_PATH },
  {
    type: 'link',
    nfIconName: 'nf-md-form_textbox',
    text: 'InputField',
    href: DOCS_INPUT_FIELD_PATH,
  },
  { type: 'link', nfIconName: 'nf-md-dock_window', text: 'Modal', href: DOCS_MODAL_PATH },
  { type: 'link', nfIconName: 'nf-fa-user', text: 'Profile', href: DOCS_PROFILE_PATH },
  { type: 'link', nfIconName: 'nf-md-dock_left', text: 'Sidebar', href: DOCS_SIDEBAR_PATH },
  { type: 'link', nfIconName: 'nf-md-table', text: 'Table', href: DOCS_TABLE_PATH },
  { type: 'link', nfIconName: 'nf-fa-shopping_cart', text: 'Orders', href: docsPath('/orders') },
  { type: 'link', nfIconName: 'nf-md-shopping', text: 'Products', href: docsPath('/products') },
  { type: 'link', nfIconName: 'nf-fa-history', text: 'History', href: docsPath('/history') },
  { type: 'link', nfIconName: 'nf-fa-users', text: 'Users', href: docsPath('/users') },
  { type: 'link', nfIconName: 'nf-oct-star', text: 'Favorites', href: docsPath('/favorite') },
  { type: 'heading', text: 'CONTENT MANAGEMENT' },
  {
    type: 'group',
    iconName: 'nf-md-file_document',
    text: 'Reports',
    children: [
      {
        type: 'link',
        nfIconName: 'nf-fa-money_check',
        text: 'Financial Report',
        href: docsPath('/financial-report'),
      },
      {
        type: 'group',
        iconName: 'nf-fa-chalkboard_user',
        text: 'User Reports',
        children: [
          {
            type: 'link',
            nfIconName: 'nf-fa-hospital_user',
            text: 'User Activity',
            href: docsPath('/user-activity'),
          },
          {
            type: 'link',
            nfIconName: 'nf-fa-user_tie',
            text: 'User Growth',
            href: docsPath('/user-growth'),
          },
        ],
      },
      {
        type: 'link',
        nfIconName: 'nf-md-view_compact',
        text: 'System Reports',
        href: docsPath('/system-reports'),
      },
    ],
  },
  {
    type: 'link',
    nfIconName: 'nf-md-integrated_circuit_chip',
    text: 'Integrations',
    href: docsPath('/integrations'),
  },
  {
    type: 'link',
    nfIconName: 'nf-fa-bell',
    text: 'Notifications',
    href: docsPath('/notifications'),
  },
  {
    type: 'link',
    nfIconName: 'nf-md-google_analytics',
    text: 'Analytics',
    href: docsPath('/analytics'),
  },
  { type: 'heading', text: 'BACKUP & RESTORE' },
  {
    type: 'link',
    nfIconName: 'nf-md-folder_lock_open_outline',
    text: 'Backup',
    href: docsPath('/backup'),
  },
  {
    type: 'link',
    nfIconName: 'nf-md-folder_refresh_outline',
    text: 'Restore',
    href: docsPath('/restore'),
  },
  {
    type: 'link',
    nfIconName: 'nf-fa-camera_retro',
    text: 'Snapshots',
    href: docsPath('/snapshots'),
  },
  { type: 'link', nfIconName: 'nf-md-calendar', text: 'Schedule', href: docsPath('/schedule') },
  {
    type: 'link',
    nfIconName: 'nf-cod-settings_gear',
    text: 'Settings',
    href: docsPath('/settings'),
  },
];

export type { DocsSidebarNavigationNode };
export { docsSidebarNavigation };
