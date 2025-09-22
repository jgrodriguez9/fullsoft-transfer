"use client";

import InputController from "@/components/controllers/InputController";
import PhoneController from "@/components/controllers/PhoneController";
import TourResumeDescription from "@/components/tour/TourResumeDescription";
import BannerReminder from "@/components/transfers/BannerReminder";
import CardCompleteReservation from "@/components/transfers/CardCompleteReservation";
import ResumePayment from "@/components/transfers/ResumePayment";
import { Spinner } from "@/components/ui/spinner";
import { EMAIL_INVALID, FIELD_REQUIRED } from "@/constant/messages";
import useGetToursById from "@/hooks/query/useGetToursById";
import { useDecodedSearchParams } from "@/hooks/useDecodedSearchParams";
import useSonner from "@/hooks/useSonner";
import { formatTime24To12, parseDate } from "@/libs/dates";
import { createTourReservation } from "@/services/tours";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
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

const TourBookContent: React.FC = () => {
  const sonner = useSonner();

  const searchParams = useDecodedSearchParams();
  const router = useRouter();
  const { data: tour, isFetching } = useGetToursById(
    searchParams.booking.tourId
  );
  const { mutate, isPending } = useMutation({
    mutationKey: ["createTransferReservation"],
    mutationFn: createTourReservation,
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
    const { paxes, time, language } = searchParams.booking.detail;
    const { price, _id } = tour;
    const reservationData = {
      destiny: tour.destiny,
      date: searchParams.booking.date,
      activity: _id,
      price: tour.isShared
        ? price * (paxes.adults + (paxes.children || 0))
        : price,
      paxes: paxes,
      currency: "USD",
      time: time,
      language: language,
      name: data.name,
      email: data.email,
      phone: data.phone,
    };
    console.log(reservationData);
    // Envía la petición de reservación solo si el formulario es válido
    mutate(reservationData);
    // Después se puede redirigir a done en onSuccess
  });
  console.log(tour);
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
                  <h2 className="text-lg font-semibold">¿Quién viaja?</h2>
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
                    Información importante sobre la actividad
                  </h2>
                  <h3 className="text-sm">
                    {tour?.name ?? "Actividad"}:{" "}
                    {parseDate(
                      searchParams?.booking?.date,
                      "yyyy-MM-dd",
                      "EEE, d MMM"
                    )}{" "}
                    {formatTime24To12(searchParams.booking.detail.time)}.
                  </h3>
                  <ul className="list-disc flex flex-col ml-2 pl-5 text-xs gap-2 text-gray-600">
                    <li>
                      Puedes cancelar sin costo hasta 24 horas antes del inicio
                      de la actividad. Después de esa hora, no se hará ninguna
                      cancelación, cambio o reembolso.
                    </li>
                    <li>
                      Las actividades no se pueden transferir de una persona a
                      otra.
                    </li>
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
              <TourResumeDescription
                tour={tour}
                date={searchParams.booking.date}
                hour={formatTime24To12(searchParams.booking.detail.time)}
              />

              <hr className="border-t border-gray-200" />

              <ResumePayment
                price={tour.price}
                paxes={searchParams.booking.detail.paxes}
                isShared={tour.isShared}
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

export default TourBookContent;
