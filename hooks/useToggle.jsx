import { useState, useCallback } from "react";

export default function useToggle(initialValue = false) {
  const [state, setState] = useState(initialValue);

  const toggle = useCallback((value) => {
    setState(current => typeof value === 'boolean' ? value : !current);
  }, []);

  return [state, toggle];
}
