import { useMemo, useState } from "react";
import { UserRound } from "lucide-react";
import useAppPopper from "./dropdown/useAppPopper";
import { Paxes } from "./dropdown/types";
import { Label } from "../ui/Label";
import dynamic from "next/dynamic";

const MenuPaxes = dynamic(() => import("./dropdown/MenuPaxes"), {
  ssr: false,
});

interface Props {
  paxes: Paxes;
  onPaxesChange: (paxes: Paxes) => void;
}

const DropdownPassengers: React.FC<Props> = ({ paxes, onPaxesChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    setReferenceElement,
    setPopperElement,
    setArrowElement,
    styles,
    attributes,
  } = useAppPopper({
    isOpen,
    onClose: () => {
      setIsOpen(false);
    },
    clickAway: true,
    options: {
      modifiers: [
        { name: "arrow" },
        { name: "offset", options: { offset: [0, 20] } },
      ],
    },
  });

  const count = useMemo(() => {
    return paxes.adults + paxes.children + paxes.infant;
  }, [paxes.adults, paxes.children, paxes.infant]);

  return (
    <>
      <div className="flex flex-col flex-1 gap-2">
        <Label>Personas</Label>
        <button
          type="button"
          ref={setReferenceElement}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="flex items-center gap-3 w-full h-[45px] p-2 border !border-input cursor-pointer focus-visible:ring-ring/50 focus-visible:ring-[3px] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-600 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
        >
          <UserRound className="text-neutrals-dark-grey size-4" />
          <span className="text-neutrals-dark-grey text-base leading-[150%] font-normal text-[14px]">
            {`${count.toString()} persona`}
          </span>
        </button>
      </div>

      <MenuPaxes
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        paxes={paxes}
        onPaxesChange={onPaxesChange}
        setPopperElement={setPopperElement}
        setArrowElement={setArrowElement}
        styles={styles}
        attributes={attributes}
      />
    </>
  );
};

export default DropdownPassengers;
