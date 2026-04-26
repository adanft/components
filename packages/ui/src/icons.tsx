import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

function CheckIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}>
      <path d="m5 12 4 4 10-10" />
    </svg>
  );
}

function ChevronDownIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function ChevronLeftIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}>
      <path d="m15 6-6 6 6 6" />
    </svg>
  );
}

function ChevronRightIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

function CircleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="6" />
    </svg>
  );
}

function MinusIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}>
      <path d="M5 12h14" />
    </svg>
  );
}

function MoonIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}>
      <path d="M20 13A8 8 0 1 1 11 4a6.6 6.6 0 0 0 9 9" />
    </svg>
  );
}

function SidebarClosedIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="2" y="3" width="20" height="18" rx="2" stroke="currentColor" strokeWidth={2} />
      <rect x="5" y="6" width="4" height="12" rx="1" fill="currentColor" />
    </svg>
  );
}

function SidebarOpenIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="2" y="3" width="20" height="18" rx="2" stroke="currentColor" strokeWidth={2} />
      <rect x="5" y="6" width="9" height="12" rx="1" fill="currentColor" />
    </svg>
  );
}

function SunIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.9 4.9 1.4 1.4" />
      <path d="m17.7 17.7 1.4 1.4" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m4.9 19.1 1.4-1.4" />
      <path d="m17.7 6.3 1.4-1.4" />
    </svg>
  );
}

export type { IconProps };
export {
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CircleIcon,
  MinusIcon,
  MoonIcon,
  SidebarClosedIcon,
  SidebarOpenIcon,
  SunIcon,
};
