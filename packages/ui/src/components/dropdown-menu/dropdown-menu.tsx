import {
  autoUpdate,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
  useTypeahead,
} from '@floating-ui/react';
import type { ReactNode } from 'react';
import { useRef, useState } from 'react';

import { DropdownMenuContext } from './context';

type DropdownMenuPosition =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end';

type DropdownMenuProps = {
  children: ReactNode;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  position?: DropdownMenuPosition;
};

function DropdownMenu({
  children,
  onOpenChange,
  open,
  position = 'bottom-start',
}: DropdownMenuProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const listRef = useRef<Array<HTMLElement | null>>([]);
  const labelsRef = useRef<Array<string | null>>([]);

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange(nextOpen) {
      onOpenChange(nextOpen);

      if (!nextOpen) {
        setActiveIndex(null);
      }
    },
    placement: position,
    middleware: [offset(16), flip(), shift({ padding: 16 })],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context, {
    event: 'mousedown',
  });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'menu' });
  const listNavigation = useListNavigation(context, {
    activeIndex,
    focusItemOnOpen: true,
    listRef,
    loop: true,
    onNavigate: setActiveIndex,
  });
  const typeahead = useTypeahead(context, {
    activeIndex,
    listRef: labelsRef,
    onMatch: setActiveIndex,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    click,
    dismiss,
    role,
    listNavigation,
    typeahead,
  ]);

  return (
    <DropdownMenuContext.Provider
      value={{
        activeIndex,
        context,
        floatingStyles,
        getFloatingProps,
        getItemProps,
        getReferenceProps,
        labelsRef,
        listRef,
        open,
        setActiveIndex,
        setFloating: refs.setFloating,
        setReference: refs.setReference,
      }}>
      {children}
    </DropdownMenuContext.Provider>
  );
}

export type { DropdownMenuPosition, DropdownMenuProps };
export default DropdownMenu;
