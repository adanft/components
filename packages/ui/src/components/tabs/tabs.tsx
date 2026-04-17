import type { ReactNode } from 'react';
import { useId } from 'react';

import { TabsContext } from './context';

type TabsProps = {
  children: ReactNode;
  onValueChange: (value: string) => void;
  value: string;
};

function Tabs({ children, onValueChange, value }: TabsProps) {
  const baseId = useId();

  return (
    <TabsContext.Provider
      value={{
        baseId,
        onValueChange,
        value,
      }}>
      {children}
    </TabsContext.Provider>
  );
}

export default Tabs;
export type { TabsProps };
