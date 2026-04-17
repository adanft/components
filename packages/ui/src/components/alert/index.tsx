import AlertRoot from './alert';
import AlertDescription from './description';
import AlertTitle from './title';

const Alert = Object.assign(AlertRoot, {
  Description: AlertDescription,
  Title: AlertTitle,
});

export default Alert;
export type { AlertProps, AlertVariant } from './alert';
export type { AlertDescriptionProps } from './description';
export type { AlertTitleProps } from './title';
