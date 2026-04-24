import type { ComponentPropsWithoutRef, KeyboardEvent } from 'react';

const TABS_LIST_ORIENTATION = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
} as const;

type TabsListOrientation = (typeof TABS_LIST_ORIENTATION)[keyof typeof TABS_LIST_ORIENTATION];

type TabsListProps = ComponentPropsWithoutRef<'div'> & {
  orientation?: TabsListOrientation;
};

function getEnabledTabs(element: HTMLDivElement) {
  return Array.from(
    element.querySelectorAll<HTMLButtonElement>(
      '[role="tab"]:not(:disabled):not([aria-disabled="true"])',
    ),
  );
}

function TabsList({
  children,
  onKeyDown,
  orientation = TABS_LIST_ORIENTATION.HORIZONTAL,
  ...props
}: TabsListProps) {
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    onKeyDown?.(event);

    if (event.defaultPrevented) {
      return;
    }

    const tabs = getEnabledTabs(event.currentTarget);

    const currentIndex = tabs.indexOf(document.activeElement as HTMLButtonElement);

    if (currentIndex === -1) {
      return;
    }

    let nextIndex = currentIndex;

    switch (event.key) {
      case 'ArrowRight':
        if (orientation === TABS_LIST_ORIENTATION.VERTICAL) {
          return;
        }

        nextIndex = (currentIndex + 1) % tabs.length;
        break;
      case 'ArrowLeft':
        if (orientation === TABS_LIST_ORIENTATION.VERTICAL) {
          return;
        }

        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        break;
      case 'ArrowDown':
        if (orientation === TABS_LIST_ORIENTATION.HORIZONTAL) {
          return;
        }

        nextIndex = (currentIndex + 1) % tabs.length;
        break;
      case 'ArrowUp':
        if (orientation === TABS_LIST_ORIENTATION.HORIZONTAL) {
          return;
        }

        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    tabs[nextIndex]?.focus();
    tabs[nextIndex]?.click();
  }

  return (
    <div {...props} role="tablist" aria-orientation={orientation} onKeyDown={handleKeyDown}>
      {children}
    </div>
  );
}

export default TabsList;
export type { TabsListOrientation, TabsListProps };
export { TABS_LIST_ORIENTATION };
