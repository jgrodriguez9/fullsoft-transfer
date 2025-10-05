import { Paxes } from "@/components/controllers/dropdown/types";
import DropdownPassengers from "@/components/controllers/DropdownPassenger";
import ImageGallery from "@/components/tour/ImageGallery";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { FIELD_REQUIRED } from "@/constant/messages";
import useGetHotelById from "@/hooks/query/useGetHotelById";
import { useDecodedSearchParams } from "@/hooks/useDecodedSearchParams";
import { parseDate } from "@/libs/dates";
import formatNumber from "@/libs/formatNumber";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, Check, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const schema = z
  .object({
    paxes: z.object({
      adults: z.number().int().min(1, FIELD_REQUIRED),
      children: z.number().int().min(0).optional(),
      infant: z.number().int().min(0).optional(),
    }),
  })
  .strict();

export type BookData = z.infer<typeof schema>;

const HotelDetailPageContent: React.FC = () => {
  const searchParams = useDecodedSearchParams();
  const router = useRouter();
  const [paxes, setPaxes] = useState<Paxes>({
    adults: 1,
    children: 0,
    infant: 0,
  });
  const { data: item, isFetching } = useGetHotelById(
    searchParams.booking.hotelId,
    searchParams.booking.date
  );

  const images = useMemo(() => {
    if (!item) return [];
    const resultImages: string[] = [];
    if (item.image?.publicUrl) {
      resultImages.push(item.image.publicUrl);
    }

    if (item.images) {
      resultImages.push(
        ...item.images.map((it: { publicUrl: string }) => it.publicUrl)
      );
    }

    return resultImages;
  }, [item]);

  const { handleSubmit, setValue } = useForm<BookData>({
    resolver: zodResolver(schema),
    defaultValues: {
      paxes: {
        adults: 1,
        children: 0,
        infant: 0,
      },
    },
  });

  const { cancelationPolicy, penaltyAfter } = useMemo(() => {
    let cancelationPolicy = "";
    let penaltyAfter = "";
    if (item?.cancellationPolicy.freeCancellationUntil !== undefined) {
      cancelationPolicy = `Puedes cancelar sin costo hasta ${item.cancellationPolicy.freeCancellationUntil} horas antes del check-in.`;
    }
    if (item?.cancellationPolicy.penaltyAfter !== undefined) {
      penaltyAfter = `Se aplicará una penalización del ${item.cancellationPolicy.penaltyAfter}% en caso de cancelación tardía.`;
    }
    return {
      cancelationPolicy,
      penaltyAfter,
    };
  }, [item]);

  const {
    pAdult,
    pChild,
    pInfant,
    priceAdult,
    priceChild,
    priceInfant,
    total,
  } = useMemo(() => {
    if (!item) {
      return {
        pAdult: 0,
        pChild: 0,
        pInfant: 0,
        priceAdult: 0,
        priceChild: 0,
        priceInfant: 0,
        total: 0,
      };
    } else {
      return {
        pAdult: item.rate.prices.adult,
        pChild: item.rate.prices.child,
        pInfant: item.rate.prices.infant,
        priceAdult: paxes.adults * item.rate.prices.adult,
        priceChild: paxes.children * item.rate.prices.child,
        priceInfant: paxes.children * item.rate.prices.infant,
        total:
          paxes.adults * item.rate.prices.adult +
          paxes.children * item.rate.prices.child +
          paxes.infant * item.rate.prices.infant,
      };
    }
  }, [paxes, item]);

  const needToKnowOptions = useMemo(() => {
    if (!item) return [];
    return item.cancellationPolicy.description
      .split(".")
      .map((str: string) => str.trim())
      .filter(Boolean); // r;
  }, [item]);

  const handleBook = handleSubmit((data) => {
    searchParams.booking.detail = data;
    const params = new URLSearchParams({
      booking: JSON.stringify(searchParams.booking),
    });
    router.push(`/daypass/book?${params.toString()}`);
  });

  if (isFetching)
    return (
      <div className="flex justify-center mt-12">
        <Spinner className="text-gray-500" />
      </div>
    );

  return (
    <div>
      <div className="mt-4 lg:mt-8 flex flex-col gap-10 justify-center max-w-5xl mx-auto pb-4 lg:pb-12 px-4 lg:px-0">
        <ImageGallery images={images} />
        <div className="flex flex-col">
          <h2 className="font-semibold text-2xl">{item.name}</h2>
          <p className="flex items-center gap-2 text-gray-500 text-sm">
            <MapPin className="size-4" />
            {item.location.address}
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-background p-3 py-6 md:gap-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="col-span-1">
              <ul className="flex flex-col gap-1.5">
                <li className="flex gap-1 items-center">
                  <Calendar className="size-4 " />
                  <span className="text-sm">
                    {parseDate(item.rate.date, "yyyy-MM-dd", "EEE, d MMM yyyy")}
                  </span>
                </li>
                <li className="flex gap-1 items-start text-green-600">
                  <Check className="size-4 " />
                  <span className="text-sm">{cancelationPolicy}</span>
                </li>
                <li className="flex gap-1 items-start text-red-600">
                  <Check className="size-4 " />
                  <span className="text-sm">{penaltyAfter}</span>
                </li>
              </ul>
            </div>
            <div className="col-span-1">
              <div className="flex flex-col gap-3">
                <DropdownPassengers
                  paxes={paxes}
                  onPaxesChange={(paxes: Paxes) => {
                    setValue("paxes", paxes);
                    setPaxes(paxes);
                  }}
                />
              </div>
            </div>
            <div className="col-span-1">
              <div className="pb-3 flex flex-col gap-2 border-b border-gray-300">
                <h3 className="text-sm font-semibold ">Detalles del precio</h3>
                <ul className="flex flex-col gap-1">
                  <li className="flex justify-between items-center">
                    <span className="text-sm">
                      {formatNumber(pAdult)} x{" "}
                      {`${paxes.adults} ${
                        paxes.adults === 1 ? "Adulto" : "Adultos"
                      }`}{" "}
                    </span>
                    <span className="text-sm">{formatNumber(priceAdult)}</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-sm">
                      {formatNumber(pChild)} x{" "}
                      {`${paxes.children} ${
                        paxes.children === 1 ? "Niño" : "Niños"
                      }`}{" "}
                    </span>
                    <span className="text-sm">{formatNumber(priceChild)}</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-sm">
                      {formatNumber(pInfant)} x{" "}
                      {`${paxes.infant} ${
                        paxes.infant === 1 ? "Infante" : "Infantes"
                      }`}{" "}
                    </span>
                    <span className="text-sm">{formatNumber(priceInfant)}</span>
                  </li>
                </ul>
              </div>
              <div className="mt-3 flex justify-between items-start">
                <span>Total</span>
                <div className="flex flex-col items-end-safe">
                  <span className="font-semibold">{formatNumber(total)}</span>
                  <small className="text-xs text-gray-500">
                    Inpuestos y cargos incluidos
                  </small>
                  <Button
                    variant={"default"}
                    className="mt-3 flex"
                    onClick={handleBook}
                  >
                    Reservar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-background p-3 py-6 md:gap-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-6">
            <div className="col-span-1">
              <h2 className="text-2xl font-semibold">Necesario saber</h2>
            </div>
            <div className="col-span-1 lg:col-span-2">
              <ul className="flex flex-col">
                {needToKnowOptions.map((it: string, index: number) => (
                  <li
                    key={`${index}-need-to-know`}
                    className="flex gap-1 items-center"
                  >
                    <Check className="size-4 font-light" />
                    <span className="text-sm">{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-background p-3 py-6 md:gap-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-6">
            <div className="col-span-1">
              <h2 className="text-2xl font-semibold">Que más debes saber</h2>
            </div>
            <div className="col-span-1 lg:col-span-2">
              <p className="text-sm">{item.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetailPageContent;
