import { type ComponentPropsWithoutRef, useState } from 'react';
import { cn } from '../helpers/cn';
import { MoonIcon, SunIcon } from '../icons';
import { toggleTheme } from '../theme';

type ThemeSwitchSize = 'sm' | 'md' | 'lg';

type ThemeSwitchProps = Omit<ComponentPropsWithoutRef<'label'>, 'onChange'> & {
  initialDark: boolean;
  onCheckedChange?: (isDark: boolean) => void;
  size?: ThemeSwitchSize;
};

const sizeClassNames: Record<
  ThemeSwitchSize,
  { icon: string; thumb: string; thumbTranslate: string; track: string }
> = {
  sm: {
    icon: 'size-3',
    thumb: 'size-4',
    thumbTranslate: 'peer-checked:translate-x-5',
    track: 'w-10 h-5',
  },
  md: {
    icon: 'size-4',
    thumb: 'size-5',
    thumbTranslate: 'peer-checked:translate-x-6',
    track: 'w-12 h-6',
  },
  lg: {
    icon: 'size-5',
    thumb: 'size-6',
    thumbTranslate: 'peer-checked:translate-x-7',
    track: 'w-14 h-7',
  },
} as const;

function ThemeSwitch({
  className,
  initialDark,
  onCheckedChange,
  size = 'md',
  ...props
}: ThemeSwitchProps) {
  const [isDark, setIsDark] = useState(initialDark);
  const sizeClasses = sizeClassNames[size];

  const handleChange = () => {
    const nextIsDark = onCheckedChange ? !isDark : toggleTheme();

    setIsDark(nextIsDark);
    onCheckedChange?.(nextIsDark);
  };

  return (
    <label
      {...props}
      className={cn(
        'relative inline-flex cursor-pointer items-center justify-between',
        sizeClasses.track,
        className,
      )}>
      <span className="sr-only">Toggle theme</span>

      <SunIcon
        aria-hidden="true"
        className={cn(
          'absolute right-1 z-1 text-white animate-[spin_15s_linear_infinite]',
          sizeClasses.icon,
        )}
      />

      <MoonIcon
        aria-hidden="true"
        className={cn(
          'absolute left-1 z-1 text-white animate-[tilt_5s_linear_infinite]',
          sizeClasses.icon,
        )}
      />

      <input
        type="checkbox"
        role="switch"
        aria-checked={isDark}
        className="peer sr-only"
        onChange={handleChange}
        checked={isDark}
      />

      <span
        aria-hidden="true"
        className={cn(
          'absolute inset-0 rounded-full bg-linear-to-l from-info to-brand',
          'peer-focus-visible:outline-2 peer-focus-visible:outline-brand peer-focus-visible:outline-offset-2',
        )}
      />

      <span
        aria-hidden="true"
        className={cn(
          'absolute bottom-0.5 left-0.5 rounded-full bg-white z-10',
          'transition-transform duration-400',
          sizeClasses.thumb,
          sizeClasses.thumbTranslate,
        )}
      />
    </label>
  );
}

export type { ThemeSwitchProps, ThemeSwitchSize };
export default ThemeSwitch;
