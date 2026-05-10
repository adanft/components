import AccordionRoot from './accordion';
import AccordionContent from './content';
import AccordionHeader from './header';
import AccordionItem from './item';
import AccordionTrigger from './trigger';

const Accordion = Object.assign(AccordionRoot, {
  Content: AccordionContent,
  Header: AccordionHeader,
  Item: AccordionItem,
  Trigger: AccordionTrigger,
});

export default Accordion;
export type { AccordionProps } from './accordion';
export type { AccordionContentProps } from './content';
export type { AccordionHeaderProps } from './header';
export type { AccordionItemProps } from './item';
export type { AccordionTriggerProps } from './trigger';
