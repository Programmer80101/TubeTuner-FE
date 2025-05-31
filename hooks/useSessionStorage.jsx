import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import useDebounce from "@/hooks/useDebounce";
import config from "@/config";

export default function useStorage(key, initialValue) {
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
      const storedValue = sessionStorage.getItem(itemKey);
      if (storedValue !== null) setStorageValue(JSON.parse(storedValue));
    } catch {}

    isFirstLoad.current = false;
  }, [itemKey]);

  useEffect(() => {
    if (isFirstLoad.current || typeof window === "undefined") return;

    try {
      sessionStorage.setItem(itemKey, JSON.stringify(debouncedStorageValue));
    } catch (e) {
      console.error(`Error saving to session storage: `, e);
    }
  }, [debouncedStorageValue, itemKey]);

  const removeStorageItem = useCallback(() => {
    sessionStorage.removeItem(itemKey);
    setStorageValue(computedInitialValue);
  }, [itemKey, computedInitialValue]);

  return [storageValue, setStorageValue, removeStorageItem];
}