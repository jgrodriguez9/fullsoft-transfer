"use client";
import { Suspense } from "react";
import TourBookContent from "./TourBookContent";

const TourBookPage: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <TourBookContent />
    </Suspense>
  );
};

export default TourBookPage;
