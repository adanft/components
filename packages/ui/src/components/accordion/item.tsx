import type { ComponentPropsWithoutRef } from 'react';
import { useId } from 'react';

import { AccordionItemContext, useAccordionContext } from './context';

type AccordionItemProps = ComponentPropsWithoutRef<'div'> & {
  value: string;
};

function AccordionItem({ children, value, ...props }: AccordionItemProps) {
  const context = useAccordionContext('Item');
  const itemId = useId();
  const triggerId = `${context.baseId}-trigger-${itemId}`;
  const contentId = `${context.baseId}-content-${itemId}`;
  const open = context.value === value;

  return (
    <AccordionItemContext.Provider
      value={{
        contentId,
        open,
        triggerId,
        value,
      }}>
      <div {...props} data-state={open ? 'open' : 'closed'}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

export default AccordionItem;
export type { AccordionItemProps };
