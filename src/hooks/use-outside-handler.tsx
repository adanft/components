import { useEffect, useEffectEvent, useRef, type RefObject } from 'react';

function useOutsideHandler<TElement extends HTMLElement>(
  action: VoidFunction,
): RefObject<TElement | null> {
  const ref = useRef<TElement | null>(null);
  const onOutside = useEffectEvent(action);

  useEffect(() => {
    const eventAction = (event: PointerEvent): void => {
      const target = event.target;
      const container = ref.current;

      if (!(target instanceof Node) || !container || container.contains(target)) {
        return;
      }

      onOutside();
    };

    document.addEventListener('pointerdown', eventAction, { passive: true });

    return () => {
      document.removeEventListener('pointerdown', eventAction);
    };
  }, []);

  return ref;
}

export default useOutsideHandler;
