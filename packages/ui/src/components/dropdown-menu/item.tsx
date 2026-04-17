import { useListItem } from '@floating-ui/react';
import type { ButtonHTMLAttributes } from 'react';

import { cn } from '../../helpers/cn';
import { useDropdownMenuContext } from './context';

type DropdownMenuItemProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onClick' | 'onSelect'
> & {
  onSelect?: () => void;
  textValue?: string;
};

function DropdownMenuItem({
  children,
  className,
  disabled,
  onSelect,
  textValue,
  ...props
}: DropdownMenuItemProps) {
  const { activeIndex, context, getItemProps, setActiveIndex } = useDropdownMenuContext('Item');
  const { ref, index } = useListItem({
    label: textValue ?? (typeof children === 'string' ? children : null),
  });
  const isActive = activeIndex === index;

  return (
    <button
      ref={ref}
      type="button"
      role="menuitem"
      aria-disabled={disabled || undefined}
      data-active={isActive ? '' : undefined}
      data-disabled={disabled ? '' : undefined}
      className={cn(
        'flex w-full items-center rounded-md px-3 py-2 text-left text-sm text-foreground outline-none',
        'data-active:bg-brand data-active:text-white',
        'data-disabled:pointer-events-none data-disabled:opacity-50',
        className,
      )}
      {...getItemProps({
        ...props,
        active: isActive,
        disabled,
        onClick() {
          if (disabled) {
            return;
          }

          onSelect?.();
          context.onOpenChange(false);
        },
        onFocus() {
          setActiveIndex(index);
        },
      })}>
      {children}
    </button>
  );
}

export type { DropdownMenuItemProps };
export default DropdownMenuItem;
