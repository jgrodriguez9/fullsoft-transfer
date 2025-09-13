"use client";

import { Suspense } from "react";
import BookingPageContent from "./BookingPageContent";

const Page: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <BookingPageContent />
    </Suspense>
  );
};

export default Page;
