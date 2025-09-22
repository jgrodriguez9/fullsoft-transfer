"use client";
import { Suspense } from "react";
import ToursPageContent from "./ToursPageContent";

const SearchPage: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <ToursPageContent />
    </Suspense>
  );
};

export default SearchPage;
