import React from "react";
import { BookingForm } from "@/components/BookingForm";
import OurServices from "@/components/home/OurServices";
import OurTours from "@/components/home/OurTours";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, Tickets } from "lucide-react";
import { TourBookingForm } from "@/components/tour/TourBookingForm";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col max-w-5xl mx-auto px-4 lg:px-0">
      <Tabs
        defaultValue="transfer"
        className="bg-transparent border border-gray-200 rounded-lg p-6 my-6"
      >
        <TabsList className="bg-transparent flex">
          <TabsTrigger
            value="transfer"
            className="!bg-transparent border-0 !shadow-none"
          >
            <div className="flex flex-col gap-1 items-center justify-center">
              <Car className="size-12" />
              <span>Traslados</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="tours"
            className="!bg-transparent border-0 !shadow-none"
          >
            <div className="flex flex-col gap-1 items-center justify-center">
              <Tickets className="size-12" />
              <span>Actividades</span>
            </div>
          </TabsTrigger>
        </TabsList>
        <div className="pt-12">
          <TabsContent value="transfer">
            <BookingForm className="" />
          </TabsContent>
          <TabsContent value="tours">
            <TourBookingForm className="" />
          </TabsContent>
        </div>
      </Tabs>
      <div className="flex flex-col gap-24">
        <OurServices />
        <OurTours />
      </div>
    </div>
  );
};

export default HomePage;
