import { Paxes } from "@/components/controllers/dropdown/types";
import DropdownPassengers from "@/components/controllers/DropdownPassenger";
import ComboBoxController from "@/components/controllers/SelectSimpleController";
import ImageGallery from "@/components/tour/ImageGallery";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { FIELD_REQUIRED } from "@/constant/messages";
import { toursIncludesOption } from "@/constant/toursIncludes";
import useGetToursById from "@/hooks/query/useGetToursById";
import { useDecodedSearchParams } from "@/hooks/useDecodedSearchParams";
import { formatTime24To12, parseDate } from "@/libs/dates";
import formatNumber from "@/libs/formatNumber";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Clock, TicketCheck, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const bookSchema = z
  .object({
    paxes: z.object({
      adults: z.number().int().min(1, FIELD_REQUIRED),
      children: z.number().int().min(0).optional(),
      infant: z.number().int().min(0).optional(),
    }),
    language: z.string().trim().min(1, FIELD_REQUIRED),
    time: z.string().trim().min(1, FIELD_REQUIRED),
  })
  .strict();

export type BookData = z.infer<typeof bookSchema>;

const ToursDetailPageContent: React.FC = () => {
  const searchParams = useDecodedSearchParams();
  const router = useRouter();
  const [paxes, setPaxes] = useState<Paxes>({
    adults: 1,
    children: 0,
    infant: 0,
  });
  const { data: item, isFetching } = useGetToursById(
    searchParams.booking.tourId
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

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BookData>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      paxes: {
        adults: 1,
        children: 0,
        infant: 0,
      },
      language: "",
      time: "",
    },
  });

  const languageOptions = useMemo(() => {
    if (!item) return [];
    const parsed = item.languageAvailables.map((lang: string) => {
      const labels: Record<string, string> = {
        en: "Inglés",
        es: "Español",
      };

      return {
        value: lang,
        label: labels[lang] || lang,
      };
    });
    return parsed;
  }, [item]);

  const timeOptions = useMemo(() => {
    if (!item) return [];
    const dateToBook = new Date(`${searchParams.booking.date}T12:00:00`);
    const weekday = dateToBook.getDay();
    const options = (item.startHoursByDay[weekday] || []).map(
      (time: string) => ({
        value: time,
        label: formatTime24To12(time),
      })
    );
    return options;
  }, [item, searchParams.booking.date]);

  const { priceAdult, priceChild, total } = useMemo(() => {
    if (!item) {
      return {
        priceAdult: 0,
        priceChild: 0,
        total: 0,
      };
    } else {
      return {
        priceAdult: paxes.adults * item.price,
        priceChild: paxes.children * item.price,
        total: paxes.adults * item.price + paxes.children * item.price,
      };
    }
  }, [paxes, item]);

  const { includes, notIncludes } = useMemo(() => {
    if (!item)
      return {
        includes: [],
        notIncludes: [],
      };
    const incl = item.includes;
    const notIncl = item.includes;
    const filteredIncl = toursIncludesOption.filter((opt) =>
      incl.includes(opt.value)
    );
    const filteredNotIncl = toursIncludesOption.filter((opt) =>
      notIncl.includes(opt.value)
    );
    return {
      includes: filteredIncl,
      notIncludes: filteredNotIncl,
    };
  }, [item]);

  const handleBook = handleSubmit((data) => {
    searchParams.booking.detail = data;
    const params = new URLSearchParams({
      booking: JSON.stringify(searchParams.booking),
    });
    router.push(`/tours/book?${params.toString()}`);
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
        <h2 className="font-semibold text-2xl">{item.name}</h2>
        <div className="rounded-lg border border-gray-200 bg-background p-3 py-6 md:gap-6">
          <div className="mb-6 border border-gray-400 bg-gray-100 inline-block px-5 py-3 rounded-lg">
            <div className="flex flex-col items-center">
              <span className="text-xs">
                {parseDate(
                  searchParams.booking.date,
                  "yyyy-MM-dd",
                  "EEE, d MMM"
                )}
              </span>
              <span className="text-sm font-semibold">
                {formatNumber(item.price)}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="col-span-1">
              <ul className="flex flex-col gap-1.5">
                <li className="flex gap-1 items-center">
                  <Clock className="size-4 " />
                  <span className="text-sm">
                    Duración: {item.durationHours} (hrs)
                  </span>
                </li>
                <li className="flex gap-1 items-center text-green-600">
                  <TicketCheck className="size-4 " />
                  <span className="text-sm">
                    Dispobile con 4h de antelación
                  </span>
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
                <ComboBoxController
                  name="language"
                  label="Idioma de preferencia"
                  control={control}
                  options={languageOptions}
                  placeholder="Selecionar opción"
                  error={errors.language?.message}
                />
                <ComboBoxController
                  name="time"
                  label="Hora de inicio"
                  control={control}
                  options={timeOptions}
                  placeholder="Selecionar opción"
                  error={errors.time?.message}
                />
              </div>
            </div>
            <div className="col-span-1">
              <div className="pb-3 flex flex-col gap-2 border-b border-gray-300">
                <h3 className="text-sm font-semibold ">Detalles del precio</h3>
                <ul className="flex flex-col gap-1">
                  <li className="flex justify-between items-center">
                    <span className="text-sm">
                      {formatNumber(item.price)} x{" "}
                      {`${paxes.adults} ${
                        paxes.adults === 1 ? "Adulto" : "Adultos"
                      }`}{" "}
                    </span>
                    <span className="text-sm">{formatNumber(priceAdult)}</span>
                  </li>
                  {paxes.children > 0 && (
                    <li className="flex justify-between items-center">
                      <span className="text-sm">
                        {formatNumber(item.price)} x{" "}
                        {`${paxes.children} ${
                          paxes.children === 1 ? "Niño" : "Niños"
                        }`}{" "}
                      </span>
                      <span className="text-sm">
                        {formatNumber(priceChild)}
                      </span>
                    </li>
                  )}
                  {paxes.infant > 0 && (
                    <li className="flex justify-between items-center">
                      <span className="text-sm">
                        {formatNumber(0)} x{" "}
                        {`${paxes.infant} ${
                          paxes.infant === 1 ? "Infante" : "Infantes"
                        }`}{" "}
                      </span>
                      <span className="text-sm">{formatNumber(0)}</span>
                    </li>
                  )}
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
              <h2 className="text-2xl font-semibold">Qué incluye o no</h2>
            </div>
            <div className="col-span-1 lg:col-span-2">
              <ul className="flex flex-col">
                {includes.map((it) => (
                  <li key={it.value} className="flex gap-1 items-center">
                    <Check className="size-4 font-light" />
                    <span className="text-sm">{it.label}</span>
                  </li>
                ))}
                {notIncludes.map((it) => (
                  <li key={it.value} className="flex gap-1 items-center">
                    <X className="size-4 font-light" />
                    <span className="text-sm">{it.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-1"></div>
            <div className="col-span-1 lg:col-span-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToursDetailPageContent;
