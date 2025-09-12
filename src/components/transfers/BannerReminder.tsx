import { diffInDays } from "@/libs/dates";
import { Clock } from "lucide-react";
import { useMemo } from "react";

interface Props {
  dateReservation: string;
}

const BannerReminder: React.FC<Props> = ({ dateReservation }) => {
  if (!dateReservation) return null;

  const daysCount = useMemo(() => {
    if (!dateReservation) return "";
    return diffInDays(dateReservation);
  }, [dateReservation]);

  return (
    <span className="flex gap-2 text-red-400 items-center">
      <Clock className="size-5" />
      <p className="text-sm">
        Tu viaje comienza en {daysCount} días. Reserva ahora, mientras hay
        disponibilidad.
      </p>
    </span>
  );
};

export default BannerReminder;
