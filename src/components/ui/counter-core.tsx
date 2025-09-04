import { cn } from "@/libs/utils";
import { CircleMinus, CirclePlus } from "lucide-react";
import { Button } from "./button";
import { CounterProps } from "../controllers/dropdown/types";

const CounterCore: React.FC<CounterProps> = ({
  className,
  classNameCounter,
  value,
  setValue,
  inc = 1,
  min,
  max,
}) => {
  return (
    <div
      className={cn(
        "bg-neutrals-white flex items-center gap-2.5",
        className,
        classNameCounter
      )}
    >
      <Button
        type="button"
        variant={"ghost"}
        disabled={value <= min}
        className="!p-0"
        onClick={() => {
          const newValue = value - inc;
          if (newValue < min) return;

          setValue(newValue);
        }}
      >
        <CircleMinus className="text-neutrals-dark-grey size-8" />
      </Button>

      <input value={value} className="w-[20px] text-center" />

      <Button
        type="button"
        variant={"ghost"}
        className="!p-0"
        disabled={value >= max}
        onClick={() => {
          const newValue = value + inc;
          if (newValue > max) return;

          setValue(newValue);
        }}
      >
        <CirclePlus className="text-neutrals-dark-grey size-8" />
      </Button>
    </div>
  );
};

export default CounterCore;
