import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../helpers/cn';

type SpinnerSpeed = 'slow' | 'normal' | 'fast';

type SpinnerProps = ComponentPropsWithoutRef<'svg'> & {
  speed?: SpinnerSpeed;
};

const speedStyles: Record<SpinnerSpeed, string> = {
  slow: 'motion-safe:animate-[spin_1.1s_linear_infinite]',
  normal: 'motion-safe:animate-[spin_0.9s_linear_infinite]',
  fast: 'motion-safe:animate-[spin_0.7s_linear_infinite]',
};

function Spinner({
  'aria-hidden': ariaHidden,
  'aria-label': ariaLabel = 'Loading',
  className,
  speed = 'normal',
  ...props
}: SpinnerProps) {
  const isDecorative = ariaHidden === true || ariaHidden === 'true';
  const spinnerClassName = cn(
    'inline-block size-5 shrink-0 text-brand motion-reduce:animate-none',
    speedStyles[speed],
    className,
  );
  const spinnerPath = (
    <path
      d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z"
      fill="currentColor"
    />
  );
  return (
    <svg
      aria-hidden={isDecorative ? ariaHidden : undefined}
      aria-label={isDecorative ? undefined : ariaLabel}
      className={spinnerClassName}
      focusable="false"
      role={isDecorative ? 'presentation' : 'status'}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      {spinnerPath}
    </svg>
  );
}

export type { SpinnerProps, SpinnerSpeed };
export default Spinner;
