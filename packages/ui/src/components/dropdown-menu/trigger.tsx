import { useMergeRefs } from '@floating-ui/react';
import { Children, cloneElement, isValidElement, type ReactElement, type Ref } from 'react';

import { useDropdownMenuContext } from './context';

type DropdownMenuTriggerProps = {
  children: ReactElement;
};

function DropdownMenuTrigger({ children }: DropdownMenuTriggerProps) {
  const { open, setReference, getReferenceProps } = useDropdownMenuContext('Trigger');
  const child = Children.only(children) as ReactElement<
    Record<string, unknown> & { ref?: Ref<Element> }
  >;

  if (!isValidElement(child)) {
    throw new Error('<DropdownMenu.Trigger> expects a single valid React element child.');
  }

  const mergedRef = useMergeRefs([
    setReference,
    (child.props as Record<string, unknown> & { ref?: Ref<Element> }).ref,
  ]);

  return cloneElement<Record<string, unknown> & { ref?: Ref<Element> }>(child, {
    ...getReferenceProps({
      ...child.props,
      'aria-expanded': open,
      'aria-haspopup': 'menu',
    }),
    'data-state': open ? 'open' : 'closed',
    ref: mergedRef,
  });
}

export type { DropdownMenuTriggerProps };
export default DropdownMenuTrigger;
