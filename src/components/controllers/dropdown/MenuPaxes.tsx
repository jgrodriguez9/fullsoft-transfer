"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Drawer from "@/components/ui/drawer";
import useTailwindBreakpoints from "@/hooks/useTailwindBreakpoints";
import { cn } from "@/libs/utils";
import { Button } from "@/components/ui/button";
import { Paxes } from "./types";
import MenuContentPaxes from "./MenuContentPaxes";

interface MenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  paxes: Paxes;
  onPaxesChange: (paxes: Paxes) => void;
  setPopperElement: (popperElement: HTMLDivElement | null) => void;
  setArrowElement: (arrowElement: HTMLDivElement | null) => void;
  styles: Record<string, CSSProperties>;
  attributes: Record<string, Record<string, string> | undefined>;
}

const MenuPaxes: React.FC<MenuProps> = ({
  isOpen,
  setIsOpen,
  paxes,
  onPaxesChange,
  setPopperElement,
  setArrowElement,
  styles,
  attributes,
}) => {
  const [innerPaxes, setInnerPaxes] = useState(paxes);
  const { actives } = useTailwindBreakpoints();

  useEffect(() => {
    setInnerPaxes(paxes);
  }, [paxes, isOpen]);

  const handleApplyClick = (): void => {
    onPaxesChange(innerPaxes);

    setIsOpen(false);
  };

  if (actives.includes("lg")) {
    if (!isOpen) return null;

    return (
      <div
        ref={setPopperElement}
        {...attributes.popper}
        style={styles.popper}
        className="z-[9999999999]"
      >
        <div ref={setArrowElement} {...attributes.arrow} style={styles.arrow} />

        <div className={cn("w-[375px] bg-white rounded-lg shadow-lg")}>
          <MenuContentPaxes
            paxes={paxes}
            onPaxesChange={onPaxesChange}
            className="rounded-lg"
          />
        </div>
      </div>
    );
  }

  return (
    <Drawer
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false);
      }}
      className="w-full space-y-4 pt-4 pb-8"
    >
      <MenuContentPaxes
        paxes={paxes}
        onPaxesChange={onPaxesChange}
        className=""
      />

      <div className="px-4 pt-4">
        <Button variant="default" className="w-full" onClick={handleApplyClick}>
          Listo
        </Button>
      </div>
    </Drawer>
  );
};

export default MenuPaxes;
