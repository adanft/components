import RadioGroupItem from './item';
import RadioGroupRoot from './radio-group';

const RadioGroup = Object.assign(RadioGroupRoot, {
  Item: RadioGroupItem,
});

export default RadioGroup;
export type { RadioGroupItemProps } from './item';
export type { RadioGroupProps } from './radio-group';
