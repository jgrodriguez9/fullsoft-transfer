"use client";
import { BookingForm } from "@/components/BookingForm";
import { CheckboxController } from "@/components/controllers/CheckboxController";
import ComboBoxController from "@/components/controllers/SelectSimpleController";
import TransferCard from "@/components/transfers/TransferCard";
import { useDecodedSearchParams } from "@/hooks/useDecodedSearchParams";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@radix-ui/react-checkbox";
import { useForm } from "react-hook-form";
import z from "zod";

const orderSchema = z
  .object({
    order: z.string(),
    privateTransfer: z.boolean().optional(),
    sharedTransfer: z.boolean().optional(),
  })
  .strict();

export type OrderData = z.infer<typeof orderSchema>;

const SearchPage: React.FC = () => {
  const searchParams = useDecodedSearchParams();

  const { control } = useForm<OrderData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      order: "price_asc",
      privateTransfer: false,
      sharedTransfer: false,
    },
  });

  return (
    <div className="relative h-screen">
      <div className="mt-4 lg:mt-8 flex flex-col gap-14 justify-center max-w-5xl mx-auto">
        <BookingForm className="w-full" defaultInitial={searchParams.booking} />

        <div className="grid grid-cols-1 lg:grid-cols-7">
          <div className="col-span-1 lg:col-span-2">
            <h2 className="mb-4 text-lg font-semibold">Filtrar por</h2>
            <div className="flex flex-col [&_label]:font-light gap-2">
              <h3 className="mb-2">Tipo de traslado</h3>
              <CheckboxController
                label="Traslado privado"
                name="privateTransfer"
                control={control}
              />
              <CheckboxController
                label="Traslado compartido"
                name="sharedTransfer"
                control={control}
              />
            </div>
          </div>
          <div className="col-span-1 lg:col-span-5">
            <div className="mb-3 flex justify-between items-end">
              <h3 className="text-sm">
                18 resultados • El total incluye impuestos y cargos
              </h3>
              <div>
                <ComboBoxController
                  name="order"
                  label="Ordenar por"
                  control={control}
                  options={[]}
                  placeholder="Precio (de menos a más)"
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <TransferCard />
              <TransferCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
