import Counter from "@/components/ui/counter";
import { cn } from "@/libs/utils";

export type PaxType = "ADULT" | "CHILD" | "INFANT";

interface PaxCounterProps {
  type: PaxType;
  guests: number;
  setGuests: (guests: number) => void;
  min: number;
  max: number;
}

const PaxCounter: React.FC<PaxCounterProps> = ({
  type,
  guests,
  setGuests,
  min,
  max,
}) => {
  const minAge = type === "ADULT" ? 18 : type === "CHILD" ? 2 : 0;

  const handleChange = (newGuest: number): void => {
    setGuests(newGuest);
  };

  return (
    <li className={cn("flex w-full flex-col gap-2")}>
      <Counter
        label={
          type === "ADULT" ? "Adultos" : type === "CHILD" ? "Niños" : "Infantes"
        }
        subLabel={
          type === "ADULT"
            ? "18 años o más"
            : type === "CHILD"
            ? `2 - 17 años`
            : "Menores de 2 años"
        }
        value={guests}
        setValue={(value) => {
          handleChange(value);
        }}
        min={min}
        max={max}
      />
    </li>
  );
};

export default PaxCounter;
