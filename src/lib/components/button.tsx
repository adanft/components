import type { ComponentPropsWithoutRef } from "react";

import { cn } from "../helpers/cn";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "sm" | "md" | "lg";
type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-brand text-white hover:bg-brand/90",
  secondary: "bg-muted text-white hover:bg-muted/90",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "text-sm h-8 px-4",
  md: "h-10 px-6",
  lg: "text-lg h-12 px-8",
};

function Button({
  children,
  className,
  type = "button",
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  const buttonClassName = cn(
    "inline-flex items-center justify-center rounded-full font-semibold cursor-pointer",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
    variantStyles[variant],
    sizeStyles[size],
    className,
  );

  return (
    <button {...props} type={type} className={buttonClassName}>
      {children}
    </button>
  );
}

export type { ButtonProps, ButtonSize, ButtonVariant };
export default Button;
