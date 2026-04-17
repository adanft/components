import { useMergeRefs } from '@floating-ui/react';
import { Children, cloneElement, isValidElement, type ReactElement, type Ref } from 'react';

import { usePopoverContext } from './context';

type PopoverTriggerProps = {
  children: ReactElement;
};

function PopoverTrigger({ children }: PopoverTriggerProps) {
  const { open, setReference, getReferenceProps } = usePopoverContext('Trigger');
  const child = Children.only(children) as ReactElement<
    Record<string, unknown> & { ref?: Ref<Element> }
  >;

  if (!isValidElement(child)) {
    throw new Error('<Popover.Trigger> expects a single valid React element child.');
  }

  const mergedRef = useMergeRefs([
    setReference,
    (child.props as Record<string, unknown> & { ref?: Ref<Element> }).ref,
  ]);

  return cloneElement<Record<string, unknown> & { ref?: Ref<Element> }>(child, {
    ...getReferenceProps({
      ...child.props,
      'aria-expanded': open,
      'aria-haspopup': 'dialog',
    }),
    ref: mergedRef,
  });
}

export default PopoverTrigger;
export type { PopoverTriggerProps };
