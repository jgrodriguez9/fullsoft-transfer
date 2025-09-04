import { cn } from "@/libs/utils";
import { useClickAway } from "@uidotdev/usehooks";
import Overlay from "./overlay";

interface DrawerProps {
  children: any;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  position?: "top" | "right" | "bottom" | "left";
}

const Drawer: React.FC<DrawerProps> = ({
  children,
  className,
  isOpen,
  onClose,
  position = "bottom",
}) => {
  const ref = useClickAway<HTMLDivElement>(() => {
    if (!isOpen) return;

    onClose();
  });

  return (
    <Overlay
      operationMode="sequential"
      overlayTransitionDuration={100}
      contentTransitionDuration={300}
      isOpen={isOpen}
      onClose={() => {
        onClose();
      }}
    >
      {({ isOpen }) => {
        return (
          <div
            ref={ref}
            className={cn(
              "absolute z-50 bg-white shadow-lg",
              "max-h-full max-w-full overflow-auto",
              "no-scrollbar",

              position === "top" && [
                "-top-full max-h-[calc(100dvh---spacing(20))] w-full min-w-full rounded-b-3xl",
                isOpen && "top-0",
              ],

              position === "right" && [
                "-right-full h-full min-h-full max-w-[calc(100dvw---spacing(20))] rounded-l-3xl",
                isOpen && "right-0",
              ],

              position === "bottom" && [
                "-bottom-full max-h-[calc(100dvh---spacing(20))] w-full min-w-full rounded-t-3xl",
                isOpen && "bottom-0",
              ],

              position === "left" && [
                "-left-full h-full min-h-full max-w-[calc(100dvw---spacing(20))] rounded-r-3xl",
                isOpen && "left-0",
              ],

              className
            )}
          >
            {children}
          </div>
        );
      }}
    </Overlay>
  );
};

export default Drawer;
