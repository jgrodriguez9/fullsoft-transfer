import React from "react";
import { BookingForm } from "@/components/BookingForm";
import OurServices from "@/components/home/OurServices";
import OurTours from "@/components/home/OurTours";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col">
      <section className="">
        <div className="absolute inset-0">
          <img
            src="bg-home.jpg"
            alt="Luxury Car"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-5xl md:text-6xl text-white font-bold mb-8">
            Servicio de transporte
          </h1>
          <p className="text-xl text-white mb-12">
            Experimente un transporte seguro con nuestra flota de élite
          </p>
          <BookingForm />
        </div>
      </section>

      <div className="flex flex-col gap-24">
        <OurServices />
        <OurTours />
      </div>
    </div>
  );
};

export default HomePage;
