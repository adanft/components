import type { ReactNode } from 'react';
import { useCallback, useId, useState } from 'react';

import type { TabsTriggerRegistration } from './context';
import { TabsContext } from './context';

type TabsProps = {
  children: ReactNode;
  onValueChange: (value: string) => void;
  value: string;
};

function Tabs({ children, onValueChange, value }: TabsProps) {
  const baseId = useId();
  const [triggers, setTriggers] = useState<TabsTriggerRegistration[]>([]);

  const registerTrigger = useCallback((trigger: TabsTriggerRegistration) => {
    setTriggers((current) => [...current, trigger]);

    return () => {
      setTriggers((current) => current.filter((registered) => registered !== trigger));
    };
  }, []);

  return (
    <TabsContext.Provider
      value={{
        baseId,
        onValueChange,
        registerTrigger,
        triggers,
        value,
      }}>
      {children}
    </TabsContext.Provider>
  );
}

export default Tabs;
export type { TabsProps };
