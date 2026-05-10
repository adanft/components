import PopoverContent from './content';
import PopoverRoot from './popover';
import PopoverTrigger from './trigger';

const Popover = Object.assign(PopoverRoot, {
  Trigger: PopoverTrigger,
  Content: PopoverContent,
});

export default Popover;
export type { PopoverContentProps } from './content';
export type { PopoverPosition, PopoverProps } from './popover';
export type { PopoverTriggerProps } from './trigger';
