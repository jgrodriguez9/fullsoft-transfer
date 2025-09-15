import { Button } from "../ui/button";

interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  isPending: boolean;
  className: string;
}

const CardCompleteReservation: React.FC<Props> = ({
  onClick,
  isPending,
  className,
}) => {
  return (
    <div
      className={`${className} rounded-lg border border-gray-200 bg-background p-3 py-6 md:gap-6`}
    >
      <div className="flex flex-col gap-4">
        <h4 className="text-xs text-gray-600">
          Al hacer clic en el botón de abajo, acepto que revisé el Aviso de
          privacidad Se abrirá en una nueva ventana. y las Alertas de viaje del
          gobierno Se abrirá en una nueva ventana.. También acepto que revisé y
          estoy de acuerdo con las Normas y restricciones Se abrirá en una nueva
          ventana., y los Términos de uso Se abrirá en una nueva ventana..
        </h4>
        <Button
          className="w-full lg:w-1/2"
          size="lg"
          onClick={onClick}
          loading={isPending}
        >
          Completar reservación
        </Button>
      </div>
    </div>
  );
};

export default CardCompleteReservation;
