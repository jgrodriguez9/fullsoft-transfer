"use client";
import { Suspense } from "react";
import HotelsPageContent from "./HotelsPageContent";

const SearchPage: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <HotelsPageContent />
    </Suspense>
  );
};

export default SearchPage;
