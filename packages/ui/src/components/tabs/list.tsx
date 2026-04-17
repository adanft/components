import type { ComponentPropsWithoutRef, KeyboardEvent } from 'react';

type TabsListProps = ComponentPropsWithoutRef<'div'>;

function TabsList({ children, onKeyDown, ...props }: TabsListProps) {
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const tabs = Array.from(
      event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]'),
    );

    const currentIndex = tabs.indexOf(document.activeElement as HTMLButtonElement);

    if (currentIndex === -1) {
      onKeyDown?.(event);
      return;
    }

    let nextIndex = currentIndex;

    switch (event.key) {
      case 'ArrowRight':
        nextIndex = (currentIndex + 1) % tabs.length;
        break;
      case 'ArrowLeft':
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = tabs.length - 1;
        break;
      default:
        onKeyDown?.(event);
        return;
    }

    event.preventDefault();
    tabs[nextIndex]?.focus();
    tabs[nextIndex]?.click();
    onKeyDown?.(event);
  }

  return (
    <div role="tablist" onKeyDown={handleKeyDown} {...props}>
      {children}
    </div>
  );
}

export default TabsList;
export type { TabsListProps };
