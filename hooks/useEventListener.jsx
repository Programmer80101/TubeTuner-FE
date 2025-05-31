import { useEffect, useRef } from "react";

export default function useEventListener(eventName, handler, targetElement) {
  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const element = (typeof window !== "undefined" && !targetElement) ? window : targetElement;

    if (!element || !element.addEventListener) return;

    const eventListener = (event) => {
      if (savedHandler.current) savedHandler.current(event);
    }

    element.addEventListener(eventName, eventListener);

    return () => element.removeEventListener(eventName, eventListener);
  }, [eventName, targetElement]);
}
