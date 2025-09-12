const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm mb-4 md:mb-0">
          © {new Date().getFullYear()} Fullsoft Transfers. Todos los derechos
          reservados.
        </p>
        <div className="flex space-x-4 text-sm">
          <a href="/privacy" className="hover:underline">
            Aviso de privacidad
          </a>
          <a href="/terms" className="hover:underline">
            Términos y condiciones
          </a>
          <a href="/contact" className="hover:underline">
            Contacto
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
