import { createContext, useContext } from 'react';

type FieldContextValue = {
  controlId: string;
  descriptionId: string;
  describedBy?: string;
  errorId: string;
  hasError: boolean;
  hasDescription: boolean;
  hasErrorMessage: boolean;
  isFieldSet?: boolean;
  required?: boolean;
  setHasDescription: (value: boolean) => void;
  setHasErrorMessage: (value: boolean) => void;
};

const FieldContext = createContext<FieldContextValue | null>(null);

function useFieldContext(componentName: string) {
  const context = useContext(FieldContext);

  if (!context) {
    throw new Error(`<Field.${componentName}> must be used within <Field> or <FieldSet>.`);
  }

  return context;
}

export type { FieldContextValue };
export { FieldContext, useFieldContext };
