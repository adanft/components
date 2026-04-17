import TooltipContent from './content';
import TooltipRoot from './tooltip';
import TooltipTrigger from './trigger';

const Tooltip = Object.assign(TooltipRoot, {
  Trigger: TooltipTrigger,
  Content: TooltipContent,
});

export default Tooltip;
export type { TooltipContentProps } from './content';
export type { TooltipProps } from './tooltip';
export type { TooltipTriggerProps } from './trigger';
