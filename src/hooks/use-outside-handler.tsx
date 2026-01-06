import { useEffect, useRef, type RefObject } from 'react';

function useOutsideHandler(action: VoidFunction): RefObject<HTMLElement | null> {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const eventAction = (event: MouseEvent | TouchEvent): void => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        action();
      }
    };
    document.addEventListener('mousedown', eventAction);
    document.addEventListener('touchstart', eventAction);

    return () => {
      document.removeEventListener('mousedown', eventAction);
      document.removeEventListener('touchstart', eventAction);
    };
  }, [action]);

  return ref;
}

export default useOutsideHandler;
