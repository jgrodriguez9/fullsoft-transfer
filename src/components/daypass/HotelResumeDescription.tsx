import { parseDate } from "@/libs/dates";
import { HotelDTO } from "@/types/daypass";
import { Hotel } from "lucide-react";

interface Props {
  hotel: HotelDTO;
  date: string;
}

const HotelResumeDescription: React.FC<Props> = ({ hotel, date }) => {
  return (
    <div className="flex flex-row gap-2">
      <Hotel className="size-8" />
      <div className="flex flex-col">
        <span className="text-sm font-semibold">{hotel.name}</span>
        <span className="text-xs text-gray-600">{hotel.location.address}</span>
        <div className="mt-4 flex flex-col">
          <span className="text-xs text-gray-600 first-letter:uppercase">
            {parseDate(date, "yyyy-MM-dd", "EEE, d MMM yyyy")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HotelResumeDescription;
