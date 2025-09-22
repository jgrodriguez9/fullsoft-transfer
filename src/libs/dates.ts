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

export const formatTime24To12 = (time: string): string => {
  const [hours, minutes] = time.split(":").map(Number);
  const suffix = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  return `${hour12}:${minutes.toString().padStart(2, "0")} ${suffix}`;
};
