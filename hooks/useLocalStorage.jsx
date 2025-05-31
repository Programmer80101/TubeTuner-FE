import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import useDebounce from "@/hooks/useDebounce";
import config from "@/config";

export default function useLocalStorage(key, initialValue) {
  const isFirstLoad = useRef(true);
  const itemKey = useMemo(() => `${config.prefix}-${key}`, [key]);

  const computedInitialValue = useMemo(() => (
    typeof initialValue === "function" ? initialValue() : initialValue
  ), []);

  const [storageValue, setStorageValue] = useState(computedInitialValue);
  const debouncedStorageValue = useDebounce(storageValue);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const storedValue = localStorage.getItem(itemKey);
      if (storedValue !== null) setStorageValue(JSON.parse(storedValue));
    } catch {}

    isFirstLoad.current = false;
  }, [itemKey]);

  useEffect(() => {
    if (isFirstLoad.current || typeof window === "undefined") return;

    try {
      localStorage.setItem(itemKey, JSON.stringify(debouncedStorageValue));
    } catch (e) {
      console.error(`Error saving to local storage: `, e);
    }
  }, [debouncedStorageValue, itemKey]);

  const removeStorageItem = useCallback(() => {
    localStorage.removeItem(itemKey);
    setStorageValue(computedInitialValue);
  }, [itemKey, computedInitialValue]);

  return [storageValue, setStorageValue, removeStorageItem];
}