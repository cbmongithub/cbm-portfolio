import { useCallback, useEffect, useRef, useState } from "react";

// Copy text to clipboard, expose a transient isCopied flag, and clean up timers on unmount.
export function useCopy(code: string) {
  const [isCopied, setIsCopied] = useState(false);
  const ref = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      if (ref.current) clearTimeout(ref.current);
      ref.current = setTimeout(() => setIsCopied(false), 1000);
    } catch (error) {
      console.error("Failed to copy", error);
    }
  }, [code]);

  useEffect(() => {
    return () => {
      if (ref.current) clearTimeout(ref.current);
    };
  }, []);

  return { handleClick, isCopied };
}
