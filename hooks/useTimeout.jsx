import { useEffect, useRef } from 'react';

export default function useTimeout(callback, delay) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null || delay === undefined) {
      return;
    }

    const timeout = setTimeout(() => {
      savedCallback.current();
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [delay]);
};

