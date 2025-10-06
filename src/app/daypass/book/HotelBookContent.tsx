"use client";

import InputController from "@/components/controllers/InputController";
import PhoneController from "@/components/controllers/PhoneController";
import HotelResumeDescription from "@/components/daypass/HotelResumeDescription";
import HotelResumePayment from "@/components/daypass/HotelResumePayment";
import TourResumeDescription from "@/components/tour/TourResumeDescription";
import BannerReminder from "@/components/transfers/BannerReminder";
import CardCompleteReservation from "@/components/transfers/CardCompleteReservation";
import ResumePayment from "@/components/transfers/ResumePayment";
import { Spinner } from "@/components/ui/spinner";
import { EMAIL_INVALID, FIELD_REQUIRED } from "@/constant/messages";
import useGetHotelById from "@/hooks/query/useGetHotelById";
import useGetToursById from "@/hooks/query/useGetToursById";
import { useDecodedSearchParams } from "@/hooks/useDecodedSearchParams";
import useSonner from "@/hooks/useSonner";
import { formatTime24To12, parseDate } from "@/libs/dates";
import { createHotelDayPassReservation } from "@/services/daypass";
import { createTourReservation } from "@/services/tours";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const bookSchema = z
  .object({
    name: z.string().trim().min(1, FIELD_REQUIRED),
    phone: z.string().trim().min(1, FIELD_REQUIRED),
    email: z.email(EMAIL_INVALID),
  })
  .strict();

export type BookData = z.infer<typeof bookSchema>;

const HotelBookContent: React.FC = () => {
  const sonner = useSonner();

  const searchParams = useDecodedSearchParams();
  console.log(searchParams);
  const router = useRouter();
  const { data: hotel, isFetching } = useGetHotelById(
    searchParams.booking.hotelId,
    searchParams.booking.date
  );
  const { mutate, isPending } = useMutation({
    mutationKey: ["createHotelDayPassReservation"],
    mutationFn: createHotelDayPassReservation,
    onSuccess: () => {
      // Maneja el éxito de la mutación, como redirigir o mostrar un mensaje
      router.push("/done");
    },
    onError: (error) => {
      // Maneja el error de la mutación, como mostrar un mensaje de error
      console.error(error);
      sonner.simpleError(error);
    },
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookData>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
    },
  });

  const onHandleClickBook = handleSubmit((data) => {
    //console.log(data);
    //console.log(searchParams);
    const { paxes } = searchParams.booking.detail;
    const { adult, child, infant } = hotel.rate.prices;
    const reservationData = {
      hotelId: searchParams.booking.hotelId,
      date: searchParams.booking.date,
      total:
        adult * paxes.adults + child * paxes.children + infant * paxes.infant,
      paxes: paxes,
      currency: "USD",
      name: data.name,
      email: data.email,
      phone: data.phone,
    };
    console.log(reservationData);
    //console.log(reservationData);
    // Envía la petición de reservación solo si el formulario es válido
    mutate(reservationData);
    // Después se puede redirigir a done en onSuccess
  });
  console.log(hotel);

  const needToKnowOptions = useMemo(() => {
    if (!hotel) return [];
    let result = hotel.cancellationPolicy.description
      .split(".")
      .map((str: string) => str.trim())
      .filter(Boolean); // r;
    if (hotel?.cancellationPolicy.freeCancellationUntil !== undefined) {
      result.push(
        `Puedes cancelar sin costo hasta ${hotel.cancellationPolicy.freeCancellationUntil} horas antes del check-in.`
      );
    }
    if (hotel?.cancellationPolicy.penaltyAfter !== undefined) {
      result.push(
        `Se aplicará una penalización del ${hotel.cancellationPolicy.penaltyAfter}% en caso de cancelación tardía.`
      );
    }

    return result;
  }, [hotel]);
  if (isFetching)
    return (
      <div className="flex justify-center mt-12">
        <Spinner className="text-gray-500" />
      </div>
    );

  return (
    <div>
      <div className="mt-4 p-4 lg:px-0 lg:mt-8 flex flex-col gap-14 justify-center max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold">
          Asegura tu reservación. ¡Solo te toma 2 minutos!
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-7">
          <div className="col-span-1 lg:col-span-4">
            <div className="flex flex-col gap-3">
              <div className="rounded-lg border border-gray-200 bg-background p-3  md:flex md:gap-6">
                <BannerReminder dateReservation={searchParams.booking.date} />
              </div>
              <div className="rounded-lg border border-gray-200 bg-background p-3 py-6 md:gap-6">
                <div className="flex flex-col gap-4">
                  <h2 className="text-lg font-semibold">¿Quién reserva?</h2>
                  <InputController
                    label="Nombre completo"
                    type="text"
                    className="w-full lg:w-2/3"
                    placeholder="Ingresa tu nombre"
                    error={errors.name?.message}
                    {...register("name")}
                  />
                  <InputController
                    label="Correo electrónico"
                    type="text"
                    className="w-full lg:w-2/3"
                    placeholder="Ingresa tu correo electrónico"
                    error={errors.email?.message}
                    {...register("email")}
                  />
                  <PhoneController
                    label="Teléfono"
                    error={errors.phone?.message}
                    control={control}
                    name="phone"
                  />
                </div>
              </div>
              <div className="rounded-lg border border-gray-200 bg-background p-3 py-6 md:gap-6">
                <div className="flex flex-col gap-4">
                  <h2 className="text-lg font-semibold">
                    Información importante sobre su reserva
                  </h2>
                  <h3 className="text-sm">
                    {hotel?.name ?? ""}:{" "}
                    {parseDate(
                      searchParams?.booking?.date,
                      "yyyy-MM-dd",
                      "EEE, d MMM yyyy"
                    )}{" "}
                  </h3>
                  <ul className="list-disc flex flex-col ml-2 pl-5 text-xs gap-2 text-gray-600">
                    {needToKnowOptions.map((str: string, index: number) => (
                      <li key={`need_to_know_${index}`}>{str}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <CardCompleteReservation
                onClick={onHandleClickBook}
                isPending={isPending}
                className="hidden lg:block"
              />
            </div>
          </div>
          <div className="col-span-1 lg:col-span-3">
            <div className="flex flex-col gap-3">
              <hr className="border-t border-gray-200" />
              <HotelResumeDescription
                hotel={hotel}
                date={searchParams.booking.date}
              />

              <hr className="border-t border-gray-200" />

              <HotelResumePayment
                price={hotel.rate.prices}
                paxes={searchParams.booking.detail.paxes}
              />
            </div>
          </div>
          <CardCompleteReservation
            onClick={onHandleClickBook}
            isPending={isPending}
            className="lg:hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default HotelBookContent;
