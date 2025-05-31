import { useState, useCallback } from "react";

export default function useClipboard() {
  const [isCopied, setIsCopied] = useState(false);

  const copy = useCallback(text => {
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    });
  }, []);

  return { isCopied, copy };
}
