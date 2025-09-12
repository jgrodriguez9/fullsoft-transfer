import { differenceInDays, format, parse, parseISO } from "date-fns";
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
  const today = parseISO(new Date().toISOString()); // ensures consistent parsing
  const targetDate = parseISO(tDate);
  const daysBetween = differenceInDays(targetDate, today);
  return daysBetween;
};
