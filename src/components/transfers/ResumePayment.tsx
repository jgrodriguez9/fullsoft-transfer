import formatNumber from "@/libs/formatNumber";
import { Paxes } from "../controllers/dropdown/types";
import { useMemo } from "react";

interface Props {
  price: number;
  paxes: Paxes;
}

const ResumePayment: React.FC<Props> = ({ price, paxes }) => {
  const total = useMemo(() => {
    return price * (paxes.adults + (paxes.children || 0));
  }, [price, paxes]);
  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-col">
        <span className="text-sm">Total a pagar</span>
        <span className="text-xs">{paxes.adults} Adultos</span>
        <span className="text-xs text-gray-600">
          Incluye impuestos y cargos
        </span>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-md text-gray-800 font-semibold">
          {formatNumber(total)} USD
        </span>
        <span className="text-xs text-gray-800">{formatNumber(total)} USD</span>
      </div>
    </div>
  );
};

export default ResumePayment;
