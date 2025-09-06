import Link from "next/link";

export default function ReservationThankYou() {
  return (
    <div className="flex min-h-screen mt-12 justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-semibold text-foreground">
          ¡Gracias por tu reservación!
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Hemos recibido tu solicitud. Te enviaremos los detalles por correo
          electrónico.
        </p>

        <div className="mt-6">
          <Link
            href="/"
            className="rounded bg-primary px-4 py-2 text-sm text-white hover:bg-primary/80"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
