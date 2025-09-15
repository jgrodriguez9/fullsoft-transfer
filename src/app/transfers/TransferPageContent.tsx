"use client";
import { BookingForm } from "@/components/BookingForm";
import Pagination from "@/components/common/Pagination";
import { CheckboxController } from "@/components/controllers/CheckboxController";
import ComboBoxController from "@/components/controllers/SelectSimpleController";
import TransferCard from "@/components/transfers/TransferCard";
import { Spinner } from "@/components/ui/spinner";
import { sortOptions } from "@/constant/sort";
import useGetAvailablesTranfers from "@/hooks/query/useGetAvailablesTranfers";
import { useDecodedSearchParams } from "@/hooks/useDecodedSearchParams";
import useParseObjectToQueryUrl from "@/hooks/useParseObjectToQueryUrl";
import { sumTotalPaxes } from "@/libs/utils";
import { Pagination as PaginationType } from "@/types";
import { QueryDTO, VehicleDTO } from "@/types/transfer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import z from "zod";

const orderSchema = z
  .object({
    order: z.string(),
    privateTransfer: z.boolean().optional(),
    sharedTransfer: z.boolean().optional(),
  })
  .strict();

export type OrderData = z.infer<typeof orderSchema>;

const TransferPageContent: React.FC = () => {
  const searchParams = useDecodedSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState<QueryDTO>({
    page: 1,
    limit: 10,
    originZoneId: searchParams?.booking?.originZoneId?.zone?._id || "",
    destinationZoneId:
      searchParams?.booking?.destinationZoneId?.zone?._id || "",
    pax: sumTotalPaxes(searchParams?.booking?.paxes) || 1,
    date: searchParams?.booking?.date ?? "",
    time: searchParams?.booking?.hour ?? "",
  });
  const queryPath = useParseObjectToQueryUrl(query);
  const { data: items, isFetching } = useGetAvailablesTranfers(queryPath);

  const { control } = useForm<OrderData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      order: "",
      privateTransfer: false,
      sharedTransfer: false,
    },
  });
  const hasMounted = useRef(false);
  const formValues = useWatch({ control });
  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    let shared =
      formValues.privateTransfer === formValues.sharedTransfer
        ? undefined
        : formValues.privateTransfer
        ? false
        : formValues.sharedTransfer;
    setQuery({
      page: 1,
      limit: 10,
      originZoneId: searchParams?.booking?.originZoneId?.zone?._id,
      destinationZoneId: searchParams?.booking?.destinationZoneId?.zone?._id,
      date: searchParams?.booking.date,
      time: searchParams?.booking.hour,
      pax: searchParams?.booking.pax,
      shared,
      sort: formValues.order === "" ? undefined : formValues.order,
    });
  }, [formValues, searchParams]);

  const handleClickCard = (vehicleSelected: VehicleDTO) => {
    searchParams.booking.vehicle = vehicleSelected;
    const params = new URLSearchParams({
      booking: JSON.stringify(searchParams.booking),
    });
    router.push(`/book?${params.toString()}`);
  };

  const handleChangePagination = useCallback((pagination: PaginationType) => {
    setQuery((prev) => ({
      ...prev,
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
    }));
  }, []);

  if (isFetching)
    return (
      <div className="flex justify-center mt-12">
        <Spinner className="text-gray-500" />
      </div>
    );

  return (
    <div className="relative h-screen">
      <div className="mt-4 lg:mt-8 flex flex-col gap-14 justify-center max-w-5xl mx-auto pb-4 lg:pb-12 px-4 lg:px-0">
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
          {items.total === 0 ? (
            <div className="col-span-1 lg:col-span-5">
              <p className="text-sm text-center">
                No hay resultados que mostrar
              </p>
            </div>
          ) : (
            <div className="col-span-1 lg:col-span-5">
              <div className="mb-3 flex justify-between items-end">
                <h3 className="text-sm">
                  {items?.total ?? ""} resultados • El total incluye impuestos y
                  cargos
                </h3>
                <div>
                  <ComboBoxController
                    name="order"
                    label="Ordenar por"
                    control={control}
                    options={sortOptions}
                    placeholder="Selecionar opción"
                    isClearable
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                {items?.data.map((item: VehicleDTO) => (
                  <TransferCard
                    key={item._id}
                    handleClickCard={handleClickCard}
                    vehicle={item}
                  />
                ))}
                <Pagination
                  handleChangePagination={handleChangePagination}
                  pageIndex={items?.page ?? 1}
                  pageSize={items?.pages ?? 1}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransferPageContent;
