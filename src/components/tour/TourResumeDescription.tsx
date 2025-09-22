import { parseDate } from "@/libs/dates";
import { TourDTO } from "@/types/tours";
import { VehicleDTO } from "@/types/transfer";
import { Car } from "lucide-react";

interface Props {
  tour: TourDTO;
  date: string;
  hour: string;
}

const TourResumeDescription: React.FC<Props> = ({ tour, date, hour }) => {
  return (
    <div className="flex flex-row gap-2">
      <Car className="size-8" />
      <div className="flex flex-col">
        <span className="text-sm font-semibold">{tour.name}</span>
        <span className="text-xs text-gray-600">
          {parseDate(date, "yyyy-MM-dd", "EEE, d MMM")}
        </span>
        <span className="text-xs text-gray-600">
          Actividad compartida • {tour.capacity} personas
        </span>
        <div className="mt-4 flex flex-col">
          <span className="text-xs text-gray-600 lowercase">
            {parseDate(date, "yyyy-MM-dd", "EEE, d MMM")} {hour}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TourResumeDescription;
