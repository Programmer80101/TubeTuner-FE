import { useRef, useEffect } from 'react';

export default function useDebounce(callback, deps = [], delay) {
  const timerRef = useRef(null);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(timerRef.current);
    };

  }, [...deps, delay]);
}
