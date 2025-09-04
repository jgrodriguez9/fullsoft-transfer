"use client";
import { BookingForm } from "@/components/BookingForm";
import TransferCard from "@/components/transfers/TransferCard";
import { useDecodedSearchParams } from "@/hooks/useDecodedSearchParams";

const SearchPage: React.FC = () => {
  const searchParams = useDecodedSearchParams();
  console.log("Search Params:", searchParams);
  return (
    <div className="relative h-screen">
      <div className="mt-4 lg:mt-8 flex flex-col gap-14 justify-center max-w-5xl mx-auto">
        <BookingForm className="w-full" />

        <div className="grid grid-cols-1 lg:grid-cols-7">
          <div className="col-span-1 lg:col-span-2"></div>
          <div className="col-span-1 lg:col-span-5">
            <TransferCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
