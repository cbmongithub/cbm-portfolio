import { useEffect, useState } from "react";

export function useMounted(initial: boolean = false) {
  const [mounted, setMounted] = useState(initial);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return { mounted };
}
