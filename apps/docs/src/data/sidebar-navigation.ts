import type { LucideIcon } from 'lucide-react';
import {
  AppWindow,
  Badge,
  Box,
  ChevronsLeftRight,
  CircleAlert,
  CircleDot,
  CircleUserRound,
  IdCard,
  ListCollapse,
  ListFilter,
  Map as MapIcon,
  Menu,
  MessageCircleMore,
  MousePointerClick,
  NotebookTabs,
  PanelLeft,
  PanelTopOpen,
  Rows3,
  SquareCheck,
  SquareStack,
  SunMoon,
  Table,
  Tag,
  TextCursorInput,
  ToggleLeft,
} from 'lucide-react';

import {
  DOCS_ACCORDION_PATH,
  DOCS_ALERT_PATH,
  DOCS_AVATAR_PATH,
  DOCS_BADGE_PATH,
  DOCS_BOX_PATH,
  DOCS_BREADCRUMBS_PATH,
  DOCS_BUTTON_PATH,
  DOCS_CHECKBOX_PATH,
  DOCS_DROPDOWN_MENU_PATH,
  DOCS_FIELD_PATH,
  DOCS_INPUT_PATH,
  DOCS_LABEL_PATH,
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
  DOCS_TEXTAREA_PATH,
  DOCS_THEME_SWITCH_PATH,
  DOCS_TOOLTIP_PATH,
} from './routes';

type DocsSidebarNavigationLinkNode = {
  href: string;
  icon: LucideIcon;
  text: string;
  type: 'link';
};

type DocsSidebarNavigationGroupNode = {
  icon: LucideIcon;
  items: Array<Pick<DocsSidebarNavigationLinkNode, 'href' | 'text'>>;
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
  { type: 'heading', text: 'PRIMITIVES' },
  { type: 'link', icon: ListCollapse, text: 'Accordion', href: DOCS_ACCORDION_PATH },
  { type: 'link', icon: PanelTopOpen, text: 'Popover', href: DOCS_POPOVER_PATH },
  { type: 'link', icon: NotebookTabs, text: 'Tabs', href: DOCS_TABS_PATH },
  { type: 'link', icon: MessageCircleMore, text: 'Tooltip', href: DOCS_TOOLTIP_PATH },
  { type: 'heading', text: 'COMPONENTS' },
  { type: 'link', icon: CircleAlert, text: 'Alert', href: DOCS_ALERT_PATH },
  { type: 'link', icon: CircleUserRound, text: 'Avatar', href: DOCS_AVATAR_PATH },
  { type: 'link', icon: Badge, text: 'Badge', href: DOCS_BADGE_PATH },
  { type: 'link', icon: Box, text: 'Box', href: DOCS_BOX_PATH },
  { type: 'link', icon: MapIcon, text: 'Breadcrumbs', href: DOCS_BREADCRUMBS_PATH },
  { type: 'link', icon: MousePointerClick, text: 'Button', href: DOCS_BUTTON_PATH },
  { type: 'link', icon: SquareCheck, text: 'Checkbox', href: DOCS_CHECKBOX_PATH },
  { type: 'link', icon: Menu, text: 'DropdownMenu', href: DOCS_DROPDOWN_MENU_PATH },
  { type: 'link', icon: Rows3, text: 'Field', href: DOCS_FIELD_PATH },
  { type: 'link', icon: TextCursorInput, text: 'Input', href: DOCS_INPUT_PATH },
  { type: 'link', icon: TextCursorInput, text: 'Textarea', href: DOCS_TEXTAREA_PATH },
  { type: 'link', icon: Tag, text: 'Label', href: DOCS_LABEL_PATH },
  { type: 'link', icon: AppWindow, text: 'Modal', href: DOCS_MODAL_PATH },
  { type: 'link', icon: ChevronsLeftRight, text: 'Pagination', href: DOCS_PAGINATION_PATH },
  { type: 'link', icon: IdCard, text: 'Profile', href: DOCS_PROFILE_PATH },
  { type: 'link', icon: CircleDot, text: 'RadioGroup', href: DOCS_RADIO_GROUP_PATH },
  { type: 'link', icon: ListFilter, text: 'Select', href: DOCS_SELECT_PATH },
  { type: 'link', icon: PanelLeft, text: 'Sidebar', href: DOCS_SIDEBAR_PATH },
  { type: 'link', icon: SquareStack, text: 'Skeleton', href: DOCS_SKELETON_PATH },
  { type: 'link', icon: ToggleLeft, text: 'Switch', href: DOCS_SWITCH_PATH },
  { type: 'link', icon: Table, text: 'Table', href: DOCS_TABLE_PATH },
  { type: 'link', icon: SunMoon, text: 'ThemeSwitch', href: DOCS_THEME_SWITCH_PATH },
];

export type { DocsSidebarNavigationNode };
export { docsSidebarNavigation };
