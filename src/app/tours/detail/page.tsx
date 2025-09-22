"use client";
import { Suspense } from "react";
import ToursDetailPageContent from "./ToursDetailPageContent";

const ToursDetailPage: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <ToursDetailPageContent />
    </Suspense>
  );
};

export default ToursDetailPage;
