import {
  type ComponentPropsWithoutRef,
  cloneElement,
  isValidElement,
  type MouseEventHandler,
} from 'react';

import { cn } from '../helpers/cn';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'info' | 'success';
type ButtonOutlineVariant = ButtonVariant | 'theme';
type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonBaseProps = ComponentPropsWithoutRef<'button'> & {
  asChild?: boolean;
  size?: ButtonSize;
};

type ButtonFilledProps = ButtonBaseProps & {
  outline?: false;
  variant?: ButtonVariant;
};

type ButtonOutlineProps = ButtonBaseProps & {
  outline: true;
  variant?: ButtonOutlineVariant;
};

type ButtonProps = ButtonFilledProps | ButtonOutlineProps;
type ButtonChildProps = {
  'aria-disabled'?: boolean;
  className?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
  tabIndex?: number;
  type?: 'button' | 'reset' | 'submit';
};

const filledVariantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-brand text-white hover:bg-brand/90',
  secondary: 'bg-muted text-white hover:bg-muted/90',
  danger: 'bg-danger text-white hover:bg-danger/90',
  info: 'bg-info text-white hover:bg-info/90',
  success: 'bg-success text-white hover:bg-success/90',
};

const outlineVariantStyles: Record<ButtonOutlineVariant, string> = {
  primary: 'border border-brand bg-transparent text-brand hover:bg-brand/10',
  secondary: 'border border-muted bg-transparent text-muted hover:bg-muted/10',
  danger: 'border border-danger bg-transparent text-danger hover:bg-danger/10',
  info: 'border border-info bg-transparent text-info hover:bg-info/10',
  success: 'border border-success bg-transparent text-success hover:bg-success/10',
  theme: 'border border-heading bg-transparent text-heading hover:bg-heading/10',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'text-sm h-8 px-4',
  md: 'h-10 px-6',
  lg: 'text-lg h-12 px-8',
};

function Button({
  asChild,
  children,
  className,
  disabled,
  onClick,
  outline = false,
  type = 'button',
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonProps) {
  const variantClassName = outline
    ? outlineVariantStyles[variant as ButtonOutlineVariant]
    : filledVariantStyles[variant as ButtonVariant];

  const buttonClassName = cn(
    'inline-flex items-center justify-center rounded-full font-semibold cursor-pointer',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
    'aria-disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:pointer-events-none',
    variantClassName,
    sizeStyles[size],
    className,
  );

  if (asChild && isValidElement<ButtonChildProps>(children)) {
    const childOnClick = children.props.onClick;
    const handleClick: MouseEventHandler<HTMLElement> = (event) => {
      if (disabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      childOnClick?.(event);
      if (!event.defaultPrevented) {
        onClick?.(event as Parameters<NonNullable<typeof onClick>>[0]);
      }
    };

    return cloneElement(children, {
      ...props,
      ...(children.type === 'button' ? { disabled, type: children.props.type ?? type } : {}),
      'aria-disabled': disabled || children.props['aria-disabled'],
      className: cn(buttonClassName, children.props.className),
      onClick: handleClick,
      tabIndex: disabled ? -1 : children.props.tabIndex,
    });
  }

  return (
    <button
      {...props}
      disabled={disabled}
      type={type}
      className={buttonClassName}
      onClick={onClick}>
      {children}
    </button>
  );
}

export type { ButtonOutlineVariant, ButtonProps, ButtonSize, ButtonVariant };
export default Button;
