import type { ButtonHTMLAttributes } from 'react';

import { useTabsContext } from './context';
import { createTabsValueId } from './helpers';

type TabsTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & { value: string };

function TabsTrigger({
  'aria-disabled': ariaDisabled,
  children,
  disabled,
  onClick,
  value,
  ...props
}: TabsTriggerProps) {
  const context = useTabsContext('Trigger');
  const isSelected = context.value === value;
  const isDisabled = disabled || ariaDisabled === true || ariaDisabled === 'true';
  const valueId = createTabsValueId(value);
  const triggerId = `${context.baseId}-trigger-${valueId}`;
  const contentId = `${context.baseId}-content-${valueId}`;

  return (
    <button
      {...props}
      id={triggerId}
      type="button"
      role="tab"
      aria-selected={isSelected}
      aria-controls={contentId}
      aria-disabled={ariaDisabled}
      disabled={disabled}
      tabIndex={isSelected ? 0 : -1}
      data-state={isSelected ? 'active' : 'inactive'}
      onClick={(event) => {
        onClick?.(event);

        if (event.defaultPrevented || isDisabled) {
          return;
        }

        context.onValueChange(value);
      }}>
      {children}
    </button>
  );
}

export default TabsTrigger;
export type { TabsTriggerProps };
