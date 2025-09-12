import { differenceInDays, format, parse } from "date-fns";
import { es } from "date-fns/locale";

export const parseDate = (
  rawDate: string,
  formatDate: string,
  parseToFormat: string
): string => {
  try {
    const parsedDate = parse(rawDate, formatDate, new Date());
    const formatted = format(parsedDate, parseToFormat, { locale: es });
    return formatted;
  } catch (error) {
    return rawDate;
  }
};

export const diffInDays = (tDate: string): number => {
  const today = new Date();
  const targetDate = new Date(tDate); // format "yyyy-MM-dd"
  const daysBetween = differenceInDays(targetDate, today);
  return daysBetween;
};
