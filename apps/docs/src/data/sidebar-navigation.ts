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
  Info,
  LayoutGrid,
  MoreHorizontal,
  Package,
  PanelLeft,
  RefreshCcw,
  Settings,
  ShoppingCart,
  Star,
  SunMoon,
  Table,
  ToggleLeft,
  TrendingUp,
  User,
  Users,
} from 'lucide-react';

import {
  DOCS_ACCORDION_PATH,
  DOCS_ALERT_PATH,
  DOCS_BADGE_PATH,
  DOCS_BOX_PATH,
  DOCS_BUTTON_PATH,
  DOCS_CHECKBOX_PATH,
  DOCS_DROPDOWN_MENU_PATH,
  DOCS_FIELD_PATH,
  DOCS_MODAL_PATH,
  DOCS_PAGINATION_PATH,
  DOCS_POPOVER_PATH,
  DOCS_PROFILE_PATH,
  DOCS_RADIO_GROUP_PATH,
  DOCS_SELECT_PATH,
  DOCS_SIDEBAR_PATH,
  DOCS_SKELETON_PATH,
  DOCS_SWITCH_PATH,
  DOCS_TABLE_PATH,
  DOCS_TABS_PATH,
  DOCS_THEME_SWITCH_PATH,
  DOCS_TOOLTIP_PATH,
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
  { type: 'link', icon: ChevronRight, text: 'Accordion', href: DOCS_ACCORDION_PATH },
  { type: 'link', icon: Activity, text: 'Alert', href: DOCS_ALERT_PATH },
  { type: 'link', icon: Bell, text: 'Badge', href: DOCS_BADGE_PATH },
  { type: 'link', icon: Box, text: 'Box', href: DOCS_BOX_PATH },
  { type: 'link', icon: Hand, text: 'Button', href: DOCS_BUTTON_PATH },
  { type: 'link', icon: CheckSquare, text: 'Checkbox', href: DOCS_CHECKBOX_PATH },
  { type: 'link', icon: MoreHorizontal, text: 'DropdownMenu', href: DOCS_DROPDOWN_MENU_PATH },
  { type: 'link', icon: FileText, text: 'Field', href: DOCS_FIELD_PATH },
  { type: 'link', icon: LayoutGrid, text: 'Modal', href: DOCS_MODAL_PATH },
  { type: 'link', icon: ChevronRight, text: 'Pagination', href: DOCS_PAGINATION_PATH },
  { type: 'link', icon: Box, text: 'Popover', href: DOCS_POPOVER_PATH },
  { type: 'link', icon: User, text: 'Profile', href: DOCS_PROFILE_PATH },
  { type: 'link', icon: CheckSquare, text: 'RadioGroup', href: DOCS_RADIO_GROUP_PATH },
  { type: 'link', icon: ChevronRight, text: 'Select', href: DOCS_SELECT_PATH },
  { type: 'link', icon: PanelLeft, text: 'Sidebar', href: DOCS_SIDEBAR_PATH },
  { type: 'link', icon: Archive, text: 'Skeleton', href: DOCS_SKELETON_PATH },
  { type: 'link', icon: ToggleLeft, text: 'Switch', href: DOCS_SWITCH_PATH },
  { type: 'link', icon: LayoutGrid, text: 'Tabs', href: DOCS_TABS_PATH },
  { type: 'link', icon: Table, text: 'Table', href: DOCS_TABLE_PATH },
  { type: 'link', icon: SunMoon, text: 'ThemeSwitch', href: DOCS_THEME_SWITCH_PATH },
  { type: 'link', icon: Info, text: 'Tooltip', href: DOCS_TOOLTIP_PATH },
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
