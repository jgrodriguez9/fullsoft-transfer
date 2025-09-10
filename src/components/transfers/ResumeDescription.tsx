import { parseDate } from "@/libs/dates";
import { VehicleDTO } from "@/types/transfer";
import { Car } from "lucide-react";

interface Props {
  vehicle: VehicleDTO;
  date: string;
  hour: string;
  origin: string;
  destination: string;
}

const ResumeDescription: React.FC<Props> = ({
  vehicle,
  date,
  hour,
  origin,
  destination,
}) => {
  return (
    <div className="flex flex-row gap-2">
      <Car className="size-8" />
      <div className="flex flex-col">
        <span className="text-sm font-semibold">{vehicle.name}</span>
        <span className="text-xs text-gray-600">
          {parseDate(date, "EEE, d MMM")}
        </span>
        <span className="text-xs text-gray-600">
          Van compartida • {vehicle.capacity} pasajeros • 2 maletas
        </span>
        <div className="mt-4 flex flex-col">
          <span className="text-xs text-gray-800 font-semibold">
            {origin} a {destination}
          </span>
          <span className="text-xs text-gray-600 lowercase">
            {parseDate(date, "EEE, d MMM")} {hour}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ResumeDescription;
