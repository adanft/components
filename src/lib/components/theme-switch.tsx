import { Moon, Sun } from 'lucide-react';
import { type ComponentPropsWithoutRef, useSyncExternalStore } from 'react';

import { toggleTheme } from '../theme';
import { readTheme, subscribeTheme } from '../helpers/theme';
import { cn } from '../helpers/cn';

const THEME_SWITCH_SIZE = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
} as const;

type ThemeSwitchSize = (typeof THEME_SWITCH_SIZE)[keyof typeof THEME_SWITCH_SIZE];

type ThemeSwitchProps = Omit<ComponentPropsWithoutRef<'label'>, 'onChange'> & {
  size?: ThemeSwitchSize;
};

const SIZE_TRACK = {
  sm: 'w-10 h-5',
  md: 'w-12 h-6',
  lg: 'w-14 h-7',
} as const;

const SIZE_THUMB = {
  sm: 'size-4',
  md: 'size-5',
  lg: 'size-6',
} as const;

const SIZE_THUMB_TRANSLATE = {
  sm: 'peer-checked:translate-x-5',
  md: 'peer-checked:translate-x-6',
  lg: 'peer-checked:translate-x-7',
} as const;

const SIZE_ICON = {
  sm: 'size-3',
  md: 'size-4',
  lg: 'size-5',
} as const;

function ThemeSwitch({ className, size = 'md', ...props }: ThemeSwitchProps) {
  const theme = useSyncExternalStore(subscribeTheme, readTheme, readTheme);

  const handleChange = () => {
    toggleTheme();
  };

  return (
    <label
      {...props}
      className={cn(
        'relative inline-flex cursor-pointer items-center justify-between',
        SIZE_TRACK[size],
        className,
      )}>
      <span className="sr-only">Toggle theme</span>

      <Sun
        aria-hidden="true"
        className={cn(
          'absolute right-1 z-1 text-white animate-[spin_15s_linear_infinite]',
          SIZE_ICON[size],
        )}
      />

      <Moon
        aria-hidden="true"
        className={cn(
          'absolute left-1 z-1 text-white animate-[tilt_5s_linear_infinite]',
          SIZE_ICON[size],
        )}
      />

      <input
        type="checkbox"
        role="switch"
        aria-checked={theme === 'dark'}
        className="peer sr-only"
        onChange={handleChange}
        checked={theme === 'dark'}
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
          SIZE_THUMB[size],
          SIZE_THUMB_TRANSLATE[size],
        )}
      />
    </label>
  );
}

export type { ThemeSwitchProps, ThemeSwitchSize };
export default ThemeSwitch;
