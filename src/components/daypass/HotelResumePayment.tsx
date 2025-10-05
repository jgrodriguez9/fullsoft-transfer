import formatNumber from "@/libs/formatNumber";
import { Paxes } from "../controllers/dropdown/types";
import { useMemo } from "react";

interface Price {
  adult: number;
  child: number;
  infant: number;
}

interface Props {
  price: Price;
  paxes: Paxes;
}

const HotelResumePayment: React.FC<Props> = ({ price, paxes }) => {
  const { priceAdult, priceChild, priceInfant, total } = useMemo(() => {
    return {
      priceAdult: paxes.adults * price.adult,
      priceChild: paxes.children * price.child,
      priceInfant: paxes.children * price.infant,
      total:
        paxes.adults * price.adult +
        paxes.children * price.child +
        paxes.infant * price.infant,
    };
  }, [paxes, price]);
  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-col">
        <span className="text-sm">Total a pagar</span>
        <span className="text-xs">
          {`${paxes.adults} ${paxes.adults === 1 ? "Adulto" : "Adultos"}`}{" "}
        </span>
        {paxes.children > 0 && (
          <span className="text-xs">
            {`${paxes.children} ${paxes.children === 1 ? "Niño" : "Niños"}`}{" "}
          </span>
        )}
        {paxes.infant > 0 && (
          <span className="text-xs">
            {`${paxes.infant} ${paxes.infant === 1 ? "Infante" : "Infantes"}`}{" "}
          </span>
        )}
        <span className="text-xs text-gray-600">
          Incluye impuestos y cargos
        </span>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-md text-gray-800 font-semibold">
          {formatNumber(total)} USD
        </span>

        <div className="flex flex-col items-end">
          <span className="text-xs text-gray-800">
            {formatNumber(priceAdult)} USD
          </span>
          {paxes.children > 0 && (
            <span className="text-xs text-gray-800">
              {formatNumber(priceChild)} USD
            </span>
          )}
          {paxes.infant > 0 && (
            <span className="text-xs text-gray-800">
              {formatNumber(priceInfant)} USD
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelResumePayment;
