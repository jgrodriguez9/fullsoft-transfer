"use client";

import InputController from "@/components/controllers/InputController";
import PhoneController from "@/components/controllers/PhoneController";
import BannerReminder from "@/components/transfers/BannerReminder";
import ResumeDescription from "@/components/transfers/ResumeDescription";
import ResumePayment from "@/components/transfers/ResumePayment";
import { Button } from "@/components/ui/button";
import { EMAIL_INVALID, FIELD_REQUIRED } from "@/constant/messages";
import { useDecodedSearchParams } from "@/hooks/useDecodedSearchParams";
import useSonner from "@/hooks/useSonner";
import { parseDate } from "@/libs/dates";
import { createTransferReservation } from "@/services/reservation";
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

const Page: React.FC = () => {
  const sonner = useSonner();

  const searchParams = useDecodedSearchParams();
  console.log(searchParams);
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationKey: ["createTransferReservation"],
    mutationFn: createTransferReservation,
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
    const { paxes } = searchParams.booking;
    const { price } = searchParams.booking.vehicle;
    const reservationData = {
      originZoneId: searchParams.booking.originZoneId?._id,
      destinationZoneId: searchParams.booking.destinationZoneId?._id,
      vehicle: searchParams.booking.vehicle._id,
      date: searchParams.booking.date,
      hour: searchParams.booking.hour,
      price: searchParams.booking.vehicle.isShared
        ? price * (paxes.adults + (paxes.children || 0))
        : price,
      paxes: paxes,
      currency: searchParams.booking.vehicle.currency,
      name: data.name,
      email: data.email,
      phone: data.phone,
    };
    console.log(reservationData);
    // Envía la petición de reservación solo si el formulario es válido
    mutate(reservationData);
    // Después se puede redirigir a done en onSuccess
  });

  return (
    <div className="relative h-screen">
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
                    Información importante sobre el traslado
                  </h2>
                  <h3 className="text-sm">
                    {searchParams?.booking?.vehicle?.name ?? "Traslado"}:{" "}
                    {searchParams?.booking?.originZoneId?.name}-{" "}
                    {parseDate(
                      searchParams?.booking?.date,
                      "yyyy-MM-dd",
                      "EEE, d MMM"
                    )}
                    .
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
              <div className="rounded-lg border border-gray-200 bg-background p-3 py-6 md:gap-6">
                <div className="flex flex-col gap-4">
                  <h4 className="text-xs text-gray-600">
                    Al hacer clic en el botón de abajo, acepto que revisé el
                    Aviso de privacidad Se abrirá en una nueva ventana. y las
                    Alertas de viaje del gobierno Se abrirá en una nueva
                    ventana.. También acepto que revisé y estoy de acuerdo con
                    las Normas y restricciones Se abrirá en una nueva ventana.,
                    y los Términos de uso Se abrirá en una nueva ventana..
                  </h4>
                  <Button
                    className="w-full lg:w-1/2"
                    size="lg"
                    onClick={onHandleClickBook}
                    loading={isPending}
                  >
                    Completar reservación
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1 lg:col-span-3">
            <div className="flex flex-col gap-3">
              <hr className="border-t border-gray-200" />
              <ResumeDescription
                vehicle={searchParams.booking.vehicle}
                date={searchParams.booking.date}
                hour={searchParams.booking.hour}
                origin={searchParams.booking.originZoneId?.name}
                destination={searchParams.booking.destinationZoneId?.name}
              />

              <hr className="border-t border-gray-200" />

              <ResumePayment
                price={searchParams.booking.vehicle.price}
                paxes={searchParams.booking.paxes}
                isShared={searchParams.booking.vehicle.isShared}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
