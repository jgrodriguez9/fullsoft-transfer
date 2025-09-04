"use client";

import { Briefcase, User } from "lucide-react";
import Image from "next/image";

export default function TransferCard() {
  return (
    <div className="rounded-xl border border-gray-200 bg-background p-2  md:flex md:gap-6 cursor-pointer">
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
  );
}
