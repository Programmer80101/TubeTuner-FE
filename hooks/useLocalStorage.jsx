import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import config from "@/config";

export default function useLocalStorage(key, defaultValue) {
  const itemKey = useMemo(() => `${config.prefix}-${key}`, [key]);
  const [state, setState] = useState(defaultValue);
  const isFirstLoad = useRef(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(itemKey);
      if (stored !== null) {
        setState(JSON.parse(stored));
      }
    } catch {}

    isFirstLoad.current = false;
  }, [itemKey]);

  useEffect(() => {
    if (isFirstLoad.current) return;
    try {
      localStorage.setItem(itemKey, JSON.stringify(state));
    } catch (e) {
      console.error("Error saving to localStorage: ", e);
    }
  }, [state, itemKey]);

  const remove = useCallback(() => {
    localStorage.removeItem(itemKey);
    setState(typeof defaultValue === "function" ? defaultValue() : defaultValue);
  }, [itemKey, defaultValue]);

  return [state, setState, remove];
}
