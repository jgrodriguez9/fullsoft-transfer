"use client";

import { Briefcase, User } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Modal from "../common/Modal";
import { Button } from "../ui/button";

const policies = [
  "La cancelación parcial no está disponible para traslados de ida y vuelta.",
  "El equipaje adicional o de gran tamaño está sujeto a la disponibilidad de espacio y puede generar un cargo adicional, que deberás pagar directamente al conductor al momento de abordar el vehículo.",
  "Los asientos infantiles de automóvil son responsabilidad del viajero; los niños deben estar sentados en un asiento de seguridad de tamaño apropiado, de acuerdo con la legislación local.",
];

interface TransferCardProps {
  handleClickCard: () => void;
}

export default function TransferCard({ handleClickCard }: TransferCardProps) {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    // Aquí puedes manejar la lógica al hacer clic en la tarjeta
    console.log("Tarjeta de traslado clickeada");
    setOpen(true);
  };

  return (
    <>
      <div
        className="rounded-xl border border-gray-200 bg-background p-2  md:flex md:gap-6 cursor-pointer"
        onClick={() => handleClick()}
      >
        {/* Vehicle Image */}
        <div className="relative h-32 w-full md:h-40 md:w-48">
          <Image
            src="/car1.jpg"
            alt="Traslado exprés van"
            fill
            className="object-cover rounded-lg"
          />
        </div>

        {/* Info Section */}
        <div className="flex-1">
          <div className="flex flex-col justify-between min-h-40">
            <div className="flex flex-col">
              <h2 className="mb-1 text-lg font-semibold tracking-tight">
                Traslado exprés
              </h2>
              <ul className="mb-4 flex gap-6 items-center text-gray-700">
                <li className="flex gap-1 items-center">
                  <User className="size-5 " />
                  <span className="text-sm">10</span>
                </li>
                <li className="flex gap-1 items-center">
                  <Briefcase className="size-5" />
                  <span className="text-sm">2</span>
                </li>
              </ul>
            </div>

            <div className="flex justify-between items-start">
              <p className="text-sm">Cancelación gratuita hasta el 14 sept.</p>

              <div className="flex flex-col items-end self-end">
                <span className="text-xs text-muted-foreground">
                  Precio por persona
                </span>
                <span className="text-lg text-muted-foreground mr-2">$22</span>
                <span className="text-xs text-muted-foreground">
                  ida y vuelta
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <h2 className="text-md  mb-8">
          Traslado compartido desde el Aeropuerto de Cancún
        </h2>
        <ul className="mb-8 list-disc space-y-2 pl-5 text-xs text-gray-700">
          {policies.map((policy, index) => (
            <li key={index}>{policy}</li>
          ))}
        </ul>
        <div className="flex justify-between items-center">
          <span className="text-lg text-muted-foreground mr-2">$22</span>
          <Button
            variant={"default"}
            onClick={() => {
              // Aquí puedes manejar la lógica de reserva
              console.log("Reservar traslado");
              setOpen(false);
              handleClickCard();
            }}
          >
            Reservar
          </Button>
        </div>
      </Modal>
    </>
  );
}
