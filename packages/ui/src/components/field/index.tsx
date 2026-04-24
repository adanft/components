import FieldRoot from './field';
import FieldDescription from './field-description';
import FieldError from './field-error';
import FieldLabel from './field-label';
import FieldLegend from './field-legend';
import FieldSet from './field-set';

const Field = Object.assign(FieldRoot, {
  Description: FieldDescription,
  Error: FieldError,
  Label: FieldLabel,
  Legend: FieldLegend,
  Set: FieldSet,
});

export default Field;
export type { FieldProps } from './field';
export type { FieldDescriptionProps } from './field-description';
export type { FieldErrorProps } from './field-error';
export type { FieldLabelProps } from './field-label';
export type { FieldLegendProps } from './field-legend';
export type { FieldSetProps } from './field-set';
