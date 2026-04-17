import { useMergeRefs } from '@floating-ui/react';
import { Children, cloneElement, isValidElement, type ReactElement, type Ref } from 'react';

import { useTooltipContext } from './context';

type TooltipTriggerProps = {
  children: ReactElement;
};

function TooltipTrigger({ children }: TooltipTriggerProps) {
  const { setReference, getReferenceProps } = useTooltipContext('Trigger');
  const child = Children.only(children) as ReactElement<
    Record<string, unknown> & { ref?: Ref<Element> }
  >;

  if (!isValidElement(child)) {
    throw new Error('<Tooltip.Trigger> expects a single valid React element child.');
  }

  const mergedRef = useMergeRefs([
    setReference,
    (child.props as Record<string, unknown> & { ref?: Ref<Element> }).ref,
  ]);

  return cloneElement<Record<string, unknown> & { ref?: Ref<Element> }>(child, {
    ...getReferenceProps({
      ...child.props,
    }),
    ref: mergedRef,
  });
}

export default TooltipTrigger;
export type { TooltipTriggerProps };
