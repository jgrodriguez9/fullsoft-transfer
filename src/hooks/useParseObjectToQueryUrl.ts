import parseObjectToQueryUrl from "@/libs/parseObjectToQueryUrl";
import { useMemo } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useParseObjectToQueryUrl = (query: any) => {
  const queryPath = useMemo(() => {
    return parseObjectToQueryUrl(query);
  }, [query]);

  return queryPath;
};

export default useParseObjectToQueryUrl;
