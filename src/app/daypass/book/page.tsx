"use client";
import { Suspense } from "react";
import HotelBookContent from "./HotelBookContent";

const HotelBookPage: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <HotelBookContent />
    </Suspense>
  );
};

export default HotelBookPage;
