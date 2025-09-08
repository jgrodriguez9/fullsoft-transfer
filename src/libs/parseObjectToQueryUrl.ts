type QueryValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | (string | number | boolean)[];
type QueryObject = Record<string, QueryValue>;

const parseObjectToQueryUrl = (query: QueryObject): string => {
  return Object.keys(query)
    .filter((key) => {
      const value = query[key];

      if (Array.isArray(value) && value.length > 0) {
        return true;
      }
      if (
        !Array.isArray(value) &&
        value !== "" &&
        value !== null &&
        value !== undefined
      ) {
        return true;
      }
      return false;
    })
    .map((key) => {
      const value = query[key];

      if (Array.isArray(value)) {
        return value
          .map(
            (v) => `${encodeURIComponent(key)}=${encodeURIComponent(String(v))}`
          )
          .join("&");
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`;
    })
    .join("&");
};

export default parseObjectToQueryUrl;
