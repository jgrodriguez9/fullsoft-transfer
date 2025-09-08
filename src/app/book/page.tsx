"use client";

import InputController from "@/components/controllers/InputController";
import PhoneController from "@/components/controllers/PhoneController";
import { Button } from "@/components/ui/button";
import { EMAIL_INVALID, FIELD_REQUIRED } from "@/constant/messages";
import { useDecodedSearchParams } from "@/hooks/useDecodedSearchParams";
import useSonner from "@/hooks/useSonner";
import { createReservation } from "@/services/reservation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Car, CarFront, Clock } from "lucide-react";
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
  const router = useRouter();
  console.log(searchParams);
  const { mutate, isPending } = useMutation({
    mutationKey: ["createReservation"],
    mutationFn: createReservation,
    onSuccess: () => {
      // Maneja el éxito de la mutación, como redirigir o mostrar un mensaje
      //router.push("/done");
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
    formState: { errors },
  } = useForm<BookData>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
    },
  });

  const onHandleClickBook = () => {
    //se envia peticion a reservacion y
    // despues se redirige a done
    mutate();
  };

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
                <span className="flex gap-2 text-red-400 items-center">
                  <Clock className="size-5" />
                  <p className="text-sm">
                    Tu viaje comienza en 10 días. Reserva ahora, mientras hay
                    disponibilidad.
                  </p>
                </span>
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
                    Traslado exprés: Aeropuerto de Cancún (CUN) (Cancun, Mexico)
                    - lun., 15 sept.
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
              <div className="flex flex-row gap-2">
                <Car className="size-8" />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">Traslado exprés</span>
                  <span className="text-xs text-gray-600">
                    lun., 15 sept. - mié., 17 sept.
                  </span>
                  <span className="text-xs text-gray-600">
                    Van compartida • 10 pasajeros • 2 maletas
                  </span>
                  <div className="mt-4 flex flex-col">
                    <span className="text-xs text-gray-800 font-semibold">
                      De Cancún, Quintana Roo (CUN-Aeropuerto Internacional de
                      Cancún) a Cancun Bay Resort - All Inclusive
                    </span>
                    <span className="text-xs text-gray-600">
                      lun., 15 sept. 10:30 a. m.
                    </span>
                  </div>
                </div>
              </div>
              <hr className="border-t border-gray-200" />
              <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                  <span className="text-sm">Total a pagar</span>
                  <span className="text-xs">2 Adultos</span>
                  <span className="text-xs text-gray-600">
                    Incluye impuestos y cargos
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-md text-gray-800 font-semibold">
                    $44 USD
                  </span>
                  <span className="text-xs text-gray-800">$44 USD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
