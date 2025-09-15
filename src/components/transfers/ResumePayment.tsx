import formatNumber from "@/libs/formatNumber";
import { Paxes } from "../controllers/dropdown/types";
import { useMemo } from "react";

interface Props {
  price: number;
  paxes: Paxes;
  isShared: boolean;
}

const ResumePayment: React.FC<Props> = ({ price, paxes, isShared }) => {
  const { total, totalAdults, totalChildren, totalInfant } = useMemo(() => {
    if (isShared) {
      return {
        total: price * (paxes.adults + (paxes.children || 0)),
        totalAdults: price * paxes.adults,
        totalChildren: price * paxes.children,
        totalInfant: 0,
      };
    } else {
      return {
        total: price,
        totalAdults: 0,
        totalChildren: 0,
        totalInfant: 0,
      };
    }
  }, [price, paxes, isShared]);
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
        {isShared && (
          <div className="flex flex-col items-end">
            <span className="text-xs text-gray-800">
              {formatNumber(totalAdults)} USD
            </span>
            {paxes.children > 0 && (
              <span className="text-xs text-gray-800">
                {formatNumber(totalChildren)} USD
              </span>
            )}
            {paxes.infant > 0 && (
              <span className="text-xs text-gray-800">
                {formatNumber(totalInfant)} USD
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumePayment;
