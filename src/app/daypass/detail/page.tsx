"use client";
import { Suspense } from "react";
import HotelDetailPageContent from "./HotelDetailPageContent";

const HotelDetailPage: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <HotelDetailPageContent />
    </Suspense>
  );
};

export default HotelDetailPage;
