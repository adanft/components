import type { ButtonHTMLAttributes } from 'react';

import { useTabsContext } from './context';
import { sanitizeTabsValue } from './helpers';

type TabsTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & { value: string };

function TabsTrigger({ children, onClick, value, ...props }: TabsTriggerProps) {
  const context = useTabsContext('Trigger');
  const isSelected = context.value === value;
  const triggerId = `${context.baseId}-trigger-${sanitizeTabsValue(value)}`;
  const contentId = `${context.baseId}-content-${sanitizeTabsValue(value)}`;

  return (
    <button
      id={triggerId}
      type="button"
      role="tab"
      aria-selected={isSelected}
      aria-controls={contentId}
      tabIndex={isSelected ? 0 : -1}
      data-state={isSelected ? 'active' : 'inactive'}
      onClick={(event) => {
        onClick?.(event);

        if (event.defaultPrevented) {
          return;
        }

        context.onValueChange(value);
      }}
      {...props}>
      {children}
    </button>
  );
}

export default TabsTrigger;
export type { TabsTriggerProps };
