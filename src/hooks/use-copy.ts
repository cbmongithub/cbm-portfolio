import { useCallback, useEffect, useRef, useState } from "react";

// Copy text to clipboard, expose a transient copied flag, and clean up timers on unmount.
export function useCopy(code: string) {
  const [copied, setCopied] = useState(false);
  const ref = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      if (ref.current) clearTimeout(ref.current);
      ref.current = setTimeout(() => setCopied(false), 1000);
    } catch (error) {
      console.error("Failed to copy", error);
    }
  }, [code]);

  useEffect(() => {
    return () => {
      if (ref.current) clearTimeout(ref.current);
    };
  }, []);

  return { handleClick, copied };
}
