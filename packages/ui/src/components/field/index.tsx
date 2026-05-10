import FieldDescription from './description';
import FieldError from './error';
import FieldRoot from './field';
import FieldLabel from './label';
import FieldLegend from './legend';
import FieldSet from './set';

const Field = Object.assign(FieldRoot, {
  Description: FieldDescription,
  Error: FieldError,
  Label: FieldLabel,
  Legend: FieldLegend,
  Set: FieldSet,
});

export type { FieldDescriptionProps } from './description';
export type { FieldErrorProps } from './error';
export type { FieldProps } from './field';
export type { FieldLabelProps } from './label';
export type { FieldLegendProps } from './legend';
export type { FieldSetProps } from './set';
export default Field;
