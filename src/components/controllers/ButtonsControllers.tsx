import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";

interface Props {
  setOpenDialog: (open: boolean) => void;
  loading?: boolean;
  isUpdate: boolean;
}

const ButtonsControllers = ({
  setOpenDialog,
  loading = false,
  isUpdate,
}: Props) => {
  return (
    <div className="flex flex-col lg:flex-row gap-3">
      <Button
        type="submit"
        className="w-full lg:w-auto"
        disabled={loading}
        value={"save"}
      >
        {loading && <Loader2Icon className="animate-spin" />}
        {isUpdate ? "Actualizar" : "Salvar"}
      </Button>
      {/* <Button type="submit" className="w-full lg:w-auto" disabled={loading} value={"saveAndEdit"}>
                {loading &&  <Loader2Icon className="animate-spin" />}
                Salvar y editar
            </Button> */}
      <Button
        variant="outline"
        type="button"
        onClick={() => setOpenDialog(false)}
        className="w-full lg:w-auto"
        disabled={loading}
      >
        Cancelar
      </Button>
    </div>
  );
};

export default ButtonsControllers;
