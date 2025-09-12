import { Button } from "../ui/button";
import { Label } from "../ui/Label";
import { Pagination as PaginationType } from "@/types";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface Props {
  pageIndex: number;
  pageSize: number;
  handleChangePagination: (pag: PaginationType) => void;
}
const Pagination: React.FC<Props> = ({
  pageIndex,
  pageSize,
  handleChangePagination,
}) => {
  return (
    <div className="flex items-center justify-end px-4">
      <div className="flex w-full items-center gap-8 lg:w-fit">
        <div className="flex w-fit items-center justify-center text-sm font-medium">
          Página {pageIndex} de {pageSize}
        </div>
        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() =>
              handleChangePagination({ pageIndex: 1, pageSize: 10 })
            }
            disabled={pageIndex === 1}
          >
            <span className="sr-only">Ir a la primera página</span>
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            className="size-8"
            size="icon"
            onClick={() =>
              handleChangePagination({ pageIndex: pageIndex - 1, pageSize: 10 })
            }
            disabled={pageIndex === 1}
          >
            <span className="sr-only">Ir a la página anterior</span>
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            className="size-8"
            size="icon"
            onClick={() =>
              handleChangePagination({ pageIndex: pageIndex + 1, pageSize: 10 })
            }
            disabled={pageIndex === pageSize}
          >
            <span className="sr-only">Ir a la página siguiente</span>
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            className="hidden size-8 lg:flex"
            size="icon"
            onClick={() =>
              handleChangePagination({ pageIndex: pageSize, pageSize: 10 })
            }
            disabled={pageIndex === pageSize}
          >
            <span className="sr-only">Ir a la última página</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
