import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import lzString from "lz-string";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const encode = (params: any): string => {
  const paramsStr = JSON.stringify(params);
  const paramsCompressed = lzString.compressToBase64(paramsStr);
  const paramsEncoded = encodeURIComponent(paramsCompressed);

  return paramsEncoded;
};

export const decode = (str: string): any | null => {
  try {
    if (str.trim().length > 0) {
      const paramsDecoded = decodeURIComponent(str.trim());
      const paramsDecompressed = lzString.decompressFromBase64(paramsDecoded);
      const param = JSON.parse(paramsDecompressed);

      return param;
    }
  } catch (err) {}

  return str;
};

export const createSearchParams = <T extends object>(
  params: T
): URLSearchParams => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === null || value === undefined) return;

    searchParams.append(key, encode(value));
  });

  return searchParams;
};
