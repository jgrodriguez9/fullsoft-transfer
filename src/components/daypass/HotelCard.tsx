import { CalendarCheck, ChevronRight, Clock } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import formatNumber from "@/libs/formatNumber";
import { HotelDTO } from "@/types/daypass";
import { getCityName } from "@/libs/utils";
import { useMemo } from "react";

interface Props {
  handleClickCard: (id: string) => void;
  hotel: HotelDTO;
}

export default function HotelCard({ handleClickCard, hotel }: Props) {
  const { price, cancelationPolicy } = useMemo(() => {
    let cancelationPolicy = "";
    if (hotel.cancellationPolicy.freeCancellationUntil !== undefined) {
      cancelationPolicy = `Puedes cancelar sin costo hasta ${hotel.cancellationPolicy.freeCancellationUntil} horas antes del check-in.`;
    }

    const price = hotel.rates[0].prices.adult;
    return {
      price,
      cancelationPolicy,
    };
  }, [hotel]);

  return (
    <>
      <div className="rounded-xl border border-gray-200 bg-background p-2  md:flex md:gap-6 cursor-pointer">
        {/* Vehicle Image */}
        <div className="relative h-32 w-full md:h-40 md:w-48">
          <Image
            src={hotel.image.publicUrl}
            alt={hotel.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        {/* Info Section */}
        <div className="flex-1">
          <div className="flex flex-col justify-between min-h-40">
            <div className="flex flex-col">
              <h2 className="mb-1 text-lg font-semibold tracking-tight">
                {hotel.name}
              </h2>
              <p className="text-sm text-gray-500">{hotel.location.address}</p>
              <p className="text-sm text-gray-500">
                {getCityName(hotel.location.city)}
              </p>

              <div className="mt-3 grid grid-cols-1 lg:grid-cols-5 gap-4">
                <div className="col-span-3">
                  <p className="text-xs text-gray-700">
                    {hotel.description.substring(0, 200)}...
                  </p>
                </div>
                <div className="col-span-2">
                  <div className="flex flex-col items-end text-gray-700">
                    <span className="text-xs">
                      Desde:{" "}
                      <span className="font-semibold text-lg text-black">
                        {formatNumber(price)}
                      </span>
                    </span>
                    <span className="text-xs leading-1.6">
                      {cancelationPolicy}
                    </span>
                    <Button
                      variant={"default"}
                      className="mt-3 flex"
                      onClick={() => {
                        handleClickCard(hotel._id);
                      }}
                    >
                      Reservar
                      <ChevronRight />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
