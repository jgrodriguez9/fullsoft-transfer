import { Car, HandHeart } from "lucide-react";

const OurTours = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 ">
        <h2 className="text-3xl font-bold text-primary mb-6 text-center">
          Tours exclusivos
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12 text-center">
          Descubre experiencias únicas en Cancún, Tulum y Riviera Maya con
          nuestros tours privados.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Tour 1: Tulum */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition overflow-hidden p-4">
            <img
              src="/tulum.jpg"
              alt="Tour a Tulum"
              className="w-full h-60 object-cover rounded-2xl"
            />

            <div className="px-2 py-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Tour a Tulum
              </h3>
              <p className="text-gray-600 text-sm">
                Explora ruinas frente al mar y disfruta de una experiencia
                cultural inolvidable.
              </p>
            </div>
          </div>

          {/* Tour 2: Isla Mujeres VIP */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition overflow-hidden p-4">
            <img
              src="/isla.avif"
              alt="Isla Mujeres VIP"
              className="w-full h-60 object-cover rounded-2xl"
            />
            <div className="px-2 py-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Isla Mujeres VIP
              </h3>
              <p className="text-gray-600 text-sm">
                Navega en catamarán privado y relájate en playas cristalinas con
                servicio premium.
              </p>
            </div>
          </div>

          {/* Tour 3: Cenotes & Mayas */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition overflow-hidden p-4">
            <img
              src="/cenote.webp"
              alt="Cenotes y Mayas"
              className="w-full h-60 object-cover rounded-2xl"
            />
            <div className="px-2 py-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Cenotes & Mayas
              </h3>
              <p className="text-gray-600 text-sm">
                Sumérgete en cenotes sagrados y conoce la historia viva de la
                cultura maya.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurTours;
