import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export function useDecodedSearchParams<T = Record<string, any>>(): T {
  const searchParams = useSearchParams();

  return useMemo(() => {
    const obj: Record<string, any> = {};

    for (const [key, value] of Array.from(searchParams.entries())) {
      try {
        // Try to parse JSON values (objects, arrays, numbers, booleans)
        const parsed = JSON.parse(value);
        obj[key] = parsed;
      } catch {
        // If not JSON, just decode as string
        obj[key] = value;
      }
    }

    return obj as T;
  }, [searchParams]);
}
