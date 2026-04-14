import { createContext, useContext } from 'react';

type RadioGroupContextValue = {
  disabled?: boolean;
  labelPosition: 'left' | 'right' | 'top' | 'bottom';
  name: string;
  onValueChange: (value: string) => void;
  value: string;
};

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

function useRadioGroupContext(componentName: string) {
  const context = useContext(RadioGroupContext);

  if (!context) {
    throw new Error(`<RadioGroup.${componentName}> must be used within <RadioGroup>.`);
  }

  return context;
}

export type { RadioGroupContextValue };
export { RadioGroupContext, useRadioGroupContext };
