import type { ButtonHTMLAttributes, KeyboardEvent } from 'react';

import { useAccordionContext, useAccordionItemContext } from './context';

type AccordionTriggerProps = ButtonHTMLAttributes<HTMLButtonElement>;

function isAccordionNavigationKey(key: string) {
  return key === 'ArrowDown' || key === 'ArrowUp' || key === 'Home' || key === 'End';
}

function AccordionTrigger({ children, onClick, onKeyDown, ...props }: AccordionTriggerProps) {
  const accordionContext = useAccordionContext('Trigger');
  const itemContext = useAccordionItemContext('Trigger');

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (!isAccordionNavigationKey(event.key)) {
      onKeyDown?.(event);
      return;
    }

    const root = event.currentTarget.closest('[data-accordion-root="true"]');
    const triggers = Array.from(
      root?.querySelectorAll<HTMLButtonElement>('[data-accordion-trigger="true"]') ?? [],
    ).filter((trigger) => trigger.closest('[data-accordion-root="true"]') === root);

    const currentIndex = triggers.indexOf(event.currentTarget);

    if (currentIndex === -1) {
      onKeyDown?.(event);
      return;
    }

    let nextIndex = currentIndex;

    switch (event.key) {
      case 'ArrowDown':
        nextIndex = (currentIndex + 1) % triggers.length;
        break;
      case 'ArrowUp':
        nextIndex = (currentIndex - 1 + triggers.length) % triggers.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = triggers.length - 1;
        break;
      default:
        onKeyDown?.(event);
        return;
    }

    event.preventDefault();
    triggers[nextIndex]?.focus();
    onKeyDown?.(event);
  }

  return (
    <button
      {...props}
      id={itemContext.triggerId}
      type="button"
      aria-expanded={itemContext.open}
      aria-controls={itemContext.contentId}
      data-accordion-trigger="true"
      data-state={itemContext.open ? 'open' : 'closed'}
      onClick={(event) => {
        onClick?.(event);

        if (event.defaultPrevented) {
          return;
        }

        accordionContext.onValueChange(
          itemContext.open
            ? accordionContext.collapsible
              ? null
              : itemContext.value
            : itemContext.value,
        );
      }}
      onKeyDown={handleKeyDown}>
      {children}
    </button>
  );
}

export default AccordionTrigger;
export type { AccordionTriggerProps };
