"use client";

import React from "react";
import AsyncSelectController from "./controllers/AsyncSelectController";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FIELD_REQUIRED } from "@/constant/messages";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePickerController } from "./controllers/DatePickerController";
import { Button } from "./ui/button";
import { Loader2Icon } from "lucide-react";
import ComboBoxController from "./controllers/SelectSimpleController";
import DropdownPassengers from "./controllers/DropdownPassenger";
import { Paxes } from "./controllers/dropdown/types";
import { getDestinies, getZones } from "@/services/zone";
import { format, parseISO } from "date-fns";
import { timeOptions } from "@/constant/time";
import { useRouter } from "next/navigation";

// Reusable schema for a zone reference
const zoneSchema = z.object({
  _id: z.string().trim().min(1, FIELD_REQUIRED),
  name: z.string().optional(),
  zone: z.object({
    _id: z.string(),
  }),
});
// ISO date (YYYY-MM-DD) validation
const dateSchema = z.date(FIELD_REQUIRED);

// 24-hour time (HH:mm) validation
const hourSchema = z.string().trim().min(1, FIELD_REQUIRED);

const transferSchema = z
  .object({
    originZoneId: zoneSchema,
    destinationZoneId: zoneSchema,
    date: dateSchema,
    hour: hourSchema,
    paxes: z.object({
      adults: z.number().int().min(1, FIELD_REQUIRED),
      children: z.number().int().min(0).optional(),
      infant: z.number().int().min(0).optional(),
    }),
  })
  .strict();

export type TransferFormData = z.infer<typeof transferSchema>;

interface Props {
  className?: string;
  defaultInitial?: any;
}

export const BookingForm: React.FC<Props> = ({
  className = "bg-white p-6 rounded-lg shadow-lg max-w-2xl",
  defaultInitial = undefined,
}) => {
  const router = useRouter();

  const [paxes, setPaxes] = React.useState<Paxes>(
    defaultInitial
      ? defaultInitial.paxes
      : {
          adults: 1,
          children: 0,
          infant: 0,
        }
  );

  const onSubmit = async (values: TransferFormData) => {
    const data: Record<string, unknown> = {};
    Object.entries(values).forEach(([key, value]) => {
      if (key === "date" && value instanceof Date) {
        data[key] = format(value, "yyyy-MM-dd");
      } else {
        data[key] = value;
      }
    });
    const params = new URLSearchParams({ booking: JSON.stringify(data) });
    router.push(`/transfers?${params.toString()}`);
  };
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<TransferFormData>({
    resolver: zodResolver(transferSchema),
    defaultValues: {
      originZoneId: {
        _id: defaultInitial?.originZoneId?._id || "",
      },
      destinationZoneId: {
        _id: defaultInitial?.destinationZoneId?._id || "",
      },
      date: defaultInitial?.date ? parseISO(defaultInitial.date) : new Date(),
      hour: defaultInitial?.hour ?? "10:30 AM",
      paxes: defaultInitial?.paxes || {
        adults: 1,
        children: 0,
        infant: 0,
      },
    },
  });
  console.log(errors);
  return (
    <form className={className} onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <AsyncSelectController
            name="originZoneId"
            label="Lugar recogida"
            control={control}
            fnFilter={getDestinies}
            query={"page=1&max=10"}
            value={
              defaultInitial?.originZoneId
                ? {
                    value: defaultInitial.originZoneId._id,
                    label: defaultInitial.originZoneId.name,
                  }
                : null
            }
            error={errors.originZoneId?._id?.message}
          />
        </div>
        <div>
          <AsyncSelectController
            name="destinationZoneId"
            label="Lugar destino"
            control={control} // Replace with actual control from react-hook-form
            fnFilter={getDestinies}
            query={"page=1&max=10"}
            error={errors.destinationZoneId?._id?.message}
            value={
              defaultInitial?.originZoneId
                ? {
                    value: defaultInitial.destinationZoneId._id,
                    label: defaultInitial.destinationZoneId.name,
                  }
                : null
            }
          />
        </div>
        <div className="grid-cols-1 md:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <DropdownPassengers
                paxes={paxes}
                onPaxesChange={(paxes: Paxes) => {
                  setValue("paxes", paxes);
                  setPaxes(paxes);
                }}
              />
            </div>
            <div>
              <DatePickerController
                name="date"
                label="Fecha"
                control={control}
                error={errors.date?.message}
                dateFormat="d MMM"
                minDate={new Date()}
              />
            </div>
            <div>
              <ComboBoxController
                name="hour"
                label="Hora"
                control={control}
                options={timeOptions}
                placeholder="Select time"
              />
            </div>
          </div>
        </div>
      </div>
      <Button
        type="submit"
        className="w-full lg:w-auto mt-4"
        disabled={false}
        value={"save"}
        variant={"default"}
      >
        {false && <Loader2Icon className="animate-spin" />}
        {"Buscar"}
      </Button>
    </form>
  );
};
