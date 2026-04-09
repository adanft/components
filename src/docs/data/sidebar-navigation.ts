import type { LucideIcon } from 'lucide-react';
import {
  Activity,
  Archive,
  BarChart3,
  Bell,
  Box,
  Calendar,
  Camera,
  CheckSquare,
  ChevronRight,
  Cpu,
  FileText,
  Hand,
  History,
  LayoutGrid,
  Package,
  PanelLeft,
  RefreshCcw,
  Settings,
  ShoppingCart,
  Star,
  SunMoon,
  Table,
  Type,
  TrendingUp,
  User,
  Users,
} from 'lucide-react';

import {
  DOCS_BOX_PATH,
  DOCS_BUTTON_PATH,
  DOCS_CHECKBOX_PATH,
  DOCS_INPUT_FIELD_PATH,
  DOCS_MODAL_PATH,
  DOCS_PAGINATION_PATH,
  DOCS_PROFILE_PATH,
  DOCS_SIDEBAR_PATH,
  DOCS_TABLE_PATH,
  DOCS_THEME_SWITCH_PATH,
  docsPath,
} from './routes';

type DocsSidebarNavigationLinkNode = {
  href: string;
  icon: LucideIcon;
  text: string;
  type: 'link';
};

type DocsSidebarNavigationGroupNode = {
  children: DocsSidebarNavigationNode[];
  icon: LucideIcon;
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
  { type: 'link', icon: Box, text: 'Box', href: DOCS_BOX_PATH },
  { type: 'link', icon: Hand, text: 'Button', href: DOCS_BUTTON_PATH },
  { type: 'link', icon: CheckSquare, text: 'Checkbox', href: DOCS_CHECKBOX_PATH },
  { type: 'link', icon: Type, text: 'InputField', href: DOCS_INPUT_FIELD_PATH },
  { type: 'link', icon: LayoutGrid, text: 'Modal', href: DOCS_MODAL_PATH },
  { type: 'link', icon: ChevronRight, text: 'Pagination', href: DOCS_PAGINATION_PATH },
  { type: 'link', icon: User, text: 'Profile', href: DOCS_PROFILE_PATH },
  { type: 'link', icon: PanelLeft, text: 'Sidebar', href: DOCS_SIDEBAR_PATH },
  { type: 'link', icon: Table, text: 'Table', href: DOCS_TABLE_PATH },
  { type: 'link', icon: SunMoon, text: 'ThemeSwitch', href: DOCS_THEME_SWITCH_PATH },
  { type: 'link', icon: ShoppingCart, text: 'Orders', href: docsPath('/orders') },
  { type: 'link', icon: Package, text: 'Products', href: docsPath('/products') },
  { type: 'link', icon: History, text: 'History', href: docsPath('/history') },
  { type: 'link', icon: Users, text: 'Users', href: docsPath('/users') },
  { type: 'link', icon: Star, text: 'Favorites', href: docsPath('/favorite') },
  { type: 'heading', text: 'CONTENT MANAGEMENT' },
  {
    type: 'group',
    icon: FileText,
    text: 'Reports',
    children: [
      {
        type: 'link',
        icon: BarChart3,
        text: 'Financial Report',
        href: docsPath('/financial-report'),
      },
      {
        type: 'group',
        icon: Users,
        text: 'User Reports',
        children: [
          {
            type: 'link',
            icon: Activity,
            text: 'User Activity',
            href: docsPath('/user-activity'),
          },
          {
            type: 'link',
            icon: TrendingUp,
            text: 'User Growth',
            href: docsPath('/user-growth'),
          },
        ],
      },
      {
        type: 'link',
        icon: LayoutGrid,
        text: 'System Reports',
        href: docsPath('/system-reports'),
      },
    ],
  },
  {
    type: 'link',
    icon: Cpu,
    text: 'Integrations',
    href: docsPath('/integrations'),
  },
  {
    type: 'link',
    icon: Bell,
    text: 'Notifications',
    href: docsPath('/notifications'),
  },
  {
    type: 'link',
    icon: BarChart3,
    text: 'Analytics',
    href: docsPath('/analytics'),
  },
  { type: 'heading', text: 'BACKUP & RESTORE' },
  {
    type: 'link',
    icon: Archive,
    text: 'Backup',
    href: docsPath('/backup'),
  },
  {
    type: 'link',
    icon: RefreshCcw,
    text: 'Restore',
    href: docsPath('/restore'),
  },
  {
    type: 'link',
    icon: Camera,
    text: 'Snapshots',
    href: docsPath('/snapshots'),
  },
  { type: 'link', icon: Calendar, text: 'Schedule', href: docsPath('/schedule') },
  {
    type: 'link',
    icon: Settings,
    text: 'Settings',
    href: docsPath('/settings'),
  },
];

export type { DocsSidebarNavigationNode };
export { docsSidebarNavigation };
