import React from "react";
import { BookingForm } from "@/components/BookingForm";

const HomePage: React.FC = () => {
  return (
    <div className="relative h-screen">
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
          Luxury Transfer Service
        </h1>
        <p className="text-xl text-white mb-12">
          Experience premium transportation with our elite fleet
        </p>
        <BookingForm />
      </div>
    </div>
  );
};

export default HomePage;
