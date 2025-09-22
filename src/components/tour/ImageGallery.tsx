import useTailwindBreakpoints from "@/hooks/useTailwindBreakpoints";
import clsx from "clsx";
import { ChevronLeftCircle, ChevronRightCircle, Images } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";

interface Props {
  images: string[];
}

const ImageGallery: React.FC<Props> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { actives } = useTailwindBreakpoints();
  const isLg = actives.includes("lg");
  const bentoImagesLength = isLg ? 5 : 3;
  const closeModal = () => setActiveIndex(null);
  const showPrev = () =>
    setActiveIndex((i) =>
      i !== null ? (i - 1 + images.length) % images.length : null
    );
  const showNext = () =>
    setActiveIndex((i) => (i !== null ? (i + 1) % images.length : null));

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex]);
  const diff = images.length - bentoImagesLength;

  const button = (
    <Button
      variant="link"
      className="absolute inset-0 rounded-none top-1/2 left-1/2 -translate-1/2 lg:rounded-br-2xl text-white"
      onClick={() => setActiveIndex(0)}
    >
      <Images className="size-8" />
      Mostrar todas las fotos
    </Button>
  );

  const generatorBentoImages = (() => {
    return (function* () {
      const imgs = Array.from({ length: 5 }, (_, i) => {
        return images[i];
      });

      yield imgs[0];
      yield imgs[1];
      yield imgs[2];
      yield imgs[3];
      yield imgs[4];
    })();
  })();

  return (
    <>
      <div
        className={clsx(
          "bg-primary-4 h-[436px] w-full",
          "grid grid-cols-2 grid-rows-5 gap-x-0 gap-y-1",

          "lg:h-[336]",
          "lg:grid-cols-4 lg:grid-rows-4 lg:gap-1",
          "lg:overflow-hidden lg:rounded-2xl"
        )}
      >
        <div className={clsx("col-span-2 row-span-3", "lg:row-span-4")}>
          <Image
            src={generatorBentoImages.next().value ?? ""}
            alt="Main"
            width={500}
            height={500}
            className="size-full"
          />
        </div>
        <div
          className={clsx(
            "row-span-2 row-start-4",
            "lg:col-start-3 lg:row-start-1"
          )}
        >
          <Image
            src={generatorBentoImages.next().value ?? ""}
            alt="Main"
            width={500}
            height={500}
            className="size-full"
          />
        </div>
        <div
          className={clsx(
            !isLg && "relative",
            "row-span-2 row-start-4",
            "lg:col-start-4 lg:row-start-1"
          )}
        >
          <Image
            src={generatorBentoImages.next().value ?? ""}
            alt="Main"
            width={500}
            height={500}
            className="size-full"
          />
          {!isLg && button}
        </div>
        <div
          className={clsx(
            "hidden lg:block",
            "col-start-3 row-span-2 row-start-3"
          )}
        >
          <Image
            src={generatorBentoImages.next().value ?? ""}
            alt="Main"
            width={500}
            height={500}
            className="size-full"
          />
        </div>

        <div
          className={clsx(
            isLg && "relative",
            "hidden lg:block",
            "col-start-4 row-span-2 row-start-3"
          )}
        >
          <Image
            src={generatorBentoImages.next().value ?? ""}
            alt="Main"
            width={500}
            height={500}
            className="size-full"
          />
          {isLg && button}
        </div>
      </div>

      {/* Modal */}
      {activeIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white text-3xl font-bold"
            aria-label="Close"
          >
            &times;
          </button>

          <div className="relative w-full max-w-3xl px-4">
            <img
              src={images[activeIndex]}
              alt={`Image ${activeIndex + 1}`}
              className="w-full h-auto rounded-lg"
            />

            {/* Navigation */}
            <button
              onClick={showPrev}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl"
              aria-label="Previous"
            >
              <ChevronLeftCircle className="size-8" />
            </button>
            <button
              onClick={showNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl"
              aria-label="Next"
            >
              <ChevronRightCircle className="size-8" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;
