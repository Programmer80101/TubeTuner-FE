import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import config from "@/config";

export default function useSessionStorage(key, initialValue) {
  const itemKey = useMemo(() => `${config.prefix}-${key}`, [key]);
  const [storageValue, setStorageValue] = useState(initialValue);
  const isFirstLoad = useRef(true);


  useEffect(() => {
    try {
      if (typeof window === "undefined") return;

      const storedValue = window.sessionStorage.getItem(itemKey);
      if (storedValue !== null) {
        setStorageValue(JSON.parse(storedValue));
      }
    } catch {}

    isFirstLoad.current = false;
  }, [itemKey]);

  useEffect(() => {
    if (isFirstLoad.current || typeof window === "undefined") return;
    try {
      window.sessionStorage.setItem(itemKey, JSON.stringify(storageValue));
    } catch (e) {
      console.error("Error saving to sessionStorage: ", e);
    }
  }, [storageValue, itemKey]);

  const removeStorageValue = useCallback(() => {
    window.sessionStorage.removeItem(itemKey);
    setStorageValue(typeof initialValue === "function" ? initialValue() : initialValue);
  }, [itemKey, initialValue]);

  return [storageValue, setStorageValue, removeStorageValue];
}

