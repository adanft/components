import type { ComponentPropsWithoutRef } from 'react';

type AccordionHeaderProps = ComponentPropsWithoutRef<'h3'>;

function AccordionHeader(props: AccordionHeaderProps) {
  return <h3 {...props} />;
}

export default AccordionHeader;
export type { AccordionHeaderProps };
