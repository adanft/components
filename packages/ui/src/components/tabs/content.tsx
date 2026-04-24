import type { ComponentPropsWithoutRef } from 'react';

import { useTabsContext } from './context';
import { createTabsValueId } from './helpers';

type TabsContentProps = ComponentPropsWithoutRef<'div'> & {
  value: string;
};

function TabsContent({ children, value, ...props }: TabsContentProps) {
  const context = useTabsContext('Content');
  const isSelected = context.value === value;
  const valueId = createTabsValueId(value);
  const triggerId = `${context.baseId}-trigger-${valueId}`;
  const contentId = `${context.baseId}-content-${valueId}`;

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
