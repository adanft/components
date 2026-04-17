import type { ComponentPropsWithoutRef } from 'react';

import { AccordionItemContext, useAccordionContext } from './context';
import { sanitizeAccordionValue } from './helpers';

type AccordionItemProps = ComponentPropsWithoutRef<'div'> & {
  value: string;
};

function AccordionItem({ children, value, ...props }: AccordionItemProps) {
  const context = useAccordionContext('Item');
  const sanitizedValue = sanitizeAccordionValue(value);
  const triggerId = `${context.baseId}-trigger-${sanitizedValue}`;
  const contentId = `${context.baseId}-content-${sanitizedValue}`;
  const open = context.value === value;

  return (
    <AccordionItemContext.Provider
      value={{
        contentId,
        open,
        triggerId,
        value,
      }}>
      <div data-state={open ? 'open' : 'closed'} {...props}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

export default AccordionItem;
export type { AccordionItemProps };
