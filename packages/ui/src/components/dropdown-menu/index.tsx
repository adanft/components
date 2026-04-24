import DropdownMenuContent from './content';
import DropdownMenuRoot from './dropdown-menu';
import DropdownMenuItem from './item';
import DropdownMenuLabel from './label';
import DropdownMenuSeparator from './separator';
import DropdownMenuTrigger from './trigger';

const DropdownMenu = Object.assign(DropdownMenuRoot, {
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
  Label: DropdownMenuLabel,
  Separator: DropdownMenuSeparator,
  Trigger: DropdownMenuTrigger,
});

export default DropdownMenu;
export type { DropdownMenuContentProps } from './content';
export type { DropdownMenuProps } from './dropdown-menu';
export type { DropdownMenuItemProps } from './item';
export type { DropdownMenuLabelProps } from './label';
export type { DropdownMenuSeparatorProps } from './separator';
export type { DropdownMenuTriggerProps } from './trigger';
