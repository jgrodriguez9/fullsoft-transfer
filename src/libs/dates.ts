import { format } from "date-fns";
import { es } from "date-fns/locale";

export const parseDate = (dateString: string, formatDate: string): string => {
  const rawDate = new Date(dateString);
  if (isNaN(rawDate.getTime())) {
    return "";
  }
  const formatted = format(rawDate, formatDate, { locale: es });

  return formatted;
};
