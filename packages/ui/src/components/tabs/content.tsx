import type { ComponentPropsWithoutRef } from 'react';

import { useTabsContext } from './context';
import { sanitizeTabsValue } from './helpers';

type TabsContentProps = ComponentPropsWithoutRef<'div'> & {
  value: string;
};

function TabsContent({ children, value, ...props }: TabsContentProps) {
  const context = useTabsContext('Content');
  const isSelected = context.value === value;
  const triggerId = `${context.baseId}-trigger-${sanitizeTabsValue(value)}`;
  const contentId = `${context.baseId}-content-${sanitizeTabsValue(value)}`;

  return (
    <div
      {...props}
      id={contentId}
      role="tabpanel"
      aria-labelledby={triggerId}
      data-state={isSelected ? 'active' : 'inactive'}
      hidden={!isSelected}>
      {children}
    </div>
  );
}

export default TabsContent;
export type { TabsContentProps };
