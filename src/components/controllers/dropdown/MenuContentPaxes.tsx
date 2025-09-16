import PaxCounter from "./PaxCounter";
import { Paxes, PaxType } from "./types";
import { cn } from "@/libs/utils";

interface MenuContentProps {
  className?: string;
  paxes: Paxes;
  onPaxesChange: (paxes: Paxes) => void;
}

const MenuContentPaxes: React.FC<MenuContentProps> = ({
  className,
  paxes,
  onPaxesChange,
}) => {
  const handlePaxesChange = (newValue: number, type: PaxType): void => {
    const copyPax = { ...paxes };
    switch (type) {
      case "ADULT":
        copyPax.adults = newValue;
        break;
      case "CHILD":
        copyPax.children = newValue;
        break;
      case "INFANT":
        copyPax.infant = newValue;
        break;
    }
    onPaxesChange(copyPax);
  };
  return (
    <ul
      style={{
        scrollbarWidth: "thin",
      }}
      className={cn(
        "bg-neutrals-white",

        "lg:overflow-y-auto",

        className
      )}
    >
      <li className={cn("px-4 py-4", "lg:px-2")}>
        <ul
          className={cn(
            "flex flex-col items-start",
            // 'lg:no-scrollbar',

            className
          )}
        >
          <PaxCounter
            type="ADULT"
            min={1}
            max={10}
            guests={paxes.adults}
            setGuests={(value) => {
              handlePaxesChange(value, "ADULT");
            }}
          />

          <PaxCounter
            type="CHILD"
            min={0}
            max={6}
            guests={paxes.children}
            setGuests={(value) => {
              handlePaxesChange(value, "CHILD");
            }}
          />

          <PaxCounter
            type="INFANT"
            min={0}
            max={paxes.adults}
            guests={paxes.infant}
            setGuests={(value) => {
              handlePaxesChange(value, "INFANT");
            }}
          />
        </ul>
      </li>
    </ul>
  );
};

export default MenuContentPaxes;
