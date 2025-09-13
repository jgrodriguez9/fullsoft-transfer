"use client";
import { Suspense } from "react";
import TransferPageContent from "./TransferPageContent";

const SearchPage: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <TransferPageContent />
    </Suspense>
  );
};

export default SearchPage;
