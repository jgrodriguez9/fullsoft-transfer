import { Car, HandHeart } from "lucide-react";

const OurServices = () => {
  return (
    <section className="mt-4 p-4 lg:px-0 lg:mt-8 flex flex-col gap-14 justify-center max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold">
        Una manera más agradable de viajar
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="col-span-1">
          <div className="flex flex-col gap-2">
            <HandHeart className="text-primary size-12" />
            <h3 className="text-lg font-semibold">
              Compromiso con la excelencia
            </h3>
            <p className="text-sm text-gray-400">
              Nuestros conductores profesionales, con la ayuda del equipo de
              soporte, le aseguran un traslado óptimo.
            </p>
          </div>
        </div>
        <div className="col-span-1">
          <div className="flex flex-col gap-2">
            <Car className="text-primary size-12" />
            <h3 className="text-lg font-semibold">Vehículos nuevos</h3>
            <p className="text-sm text-gray-400">
              Los vehículos nuevos y cómodos, el servicio puerta a puerta y los
              amables conductores le ofrecen un traslado impecable.
            </p>
          </div>
        </div>
        <div className="col-span-1">
          <div className="flex flex-col gap-2">
            <HandHeart className="text-primary size-12" />
            <h3 className="text-lg font-semibold">Atención personalizada</h3>
            <p className="text-sm text-gray-400">
              Nos adaptamos a tus necesidades con atención personalizada en cada
              trayecto. Desde la reserva hasta el destino, cuidamos cada detalle
              para ti.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurServices;
