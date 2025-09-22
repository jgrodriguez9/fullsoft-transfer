import { CalendarCheck, ChevronRight, Clock } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import formatNumber from "@/libs/formatNumber";
import { TourDTO } from "@/types/tours";

interface Props {
  handleClickCard: (id: string) => void;
  tour: TourDTO;
}

export default function TourCard({ handleClickCard, tour }: Props) {
  return (
    <>
      <div className="rounded-xl border border-gray-200 bg-background p-2  md:flex md:gap-6 cursor-pointer">
        {/* Vehicle Image */}
        <div className="relative h-32 w-full md:h-40 md:w-48">
          <Image
            src={tour.image.publicUrl}
            alt={tour.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        {/* Info Section */}
        <div className="flex-1">
          <div className="flex flex-col justify-between min-h-40">
            <div className="flex flex-col">
              <h2 className="mb-1 text-lg font-semibold tracking-tight">
                {tour.name}
              </h2>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">
                  Horarios disponibles
                </span>
                <ul className="flex gap-1 mb-4">
                  {tour.availableHours.map((h) => (
                    <li
                      key={h}
                      className="bg-gray-200 rounded-xs text-xs px-2 py-0.5"
                    >
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col lg:flex-row justify-between">
                <ul className="flex flex-col text-gray-700">
                  <li className="flex gap-1 items-center">
                    <Clock className="size-4 " />
                    <span className="text-sm">
                      Duración: {tour.durationHours} (hrs)
                    </span>
                  </li>
                  <li className="flex gap-1 items-center text-green-700">
                    <CalendarCheck className="size-4 " />
                    <span className="text-sm">
                      Cancelación gratuita disponible
                    </span>
                  </li>
                </ul>
                <div className="flex flex-col items-end text-gray-700">
                  <span className="text-xs">
                    Desde:{" "}
                    <span className="font-semibold text-lg text-black">
                      {formatNumber(tour.price)}
                    </span>
                  </span>
                  <span className="text-xs leading-0.5">
                    Dispobile con 4h de antelación
                  </span>
                  <Button
                    variant={"default"}
                    className="mt-3 flex"
                    onClick={() => {
                      handleClickCard(tour._id);
                    }}
                  >
                    Ver tickets
                    <ChevronRight />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
