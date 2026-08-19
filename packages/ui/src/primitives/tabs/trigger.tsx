import type { ButtonHTMLAttributes } from 'react';
import { useEffect, useRef } from 'react';

import { useTabsContext } from './context';
import { createTabsValueId, findFirstEnabledTriggerInDocumentOrder } from './helpers';

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
  const { registerTrigger } = context;
  const nodeRef = useRef<HTMLButtonElement>(null);
  const isSelected = context.value === value;
  const isDisabled = disabled || ariaDisabled === true || ariaDisabled === 'true';
  const hasSelectedTrigger = context.triggers.some((trigger) => trigger.value === context.value);
  const fallbackValue = findFirstEnabledTriggerInDocumentOrder(context.triggers)?.value;
  const isFocusable = isSelected || (!hasSelectedTrigger && value === fallbackValue);
  const valueId = createTabsValueId(value);
  const triggerId = `${context.baseId}-trigger-${valueId}`;
  const contentId = `${context.baseId}-content-${valueId}`;

  useEffect(() => {
    const node = nodeRef.current;

    if (!node) {
      return;
    }

    return registerTrigger({ disabled: isDisabled, node, value });
  }, [isDisabled, registerTrigger, value]);

  return (
    <button
      {...props}
      ref={nodeRef}
      id={triggerId}
      type="button"
      role="tab"
      aria-selected={isSelected}
      aria-controls={contentId}
      aria-disabled={ariaDisabled}
      disabled={disabled}
      tabIndex={isFocusable ? 0 : -1}
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
