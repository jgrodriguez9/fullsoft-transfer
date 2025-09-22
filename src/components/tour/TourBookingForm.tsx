"use client";

import React from "react";
import AsyncSelectController from "../controllers/AsyncSelectController";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FIELD_REQUIRED } from "@/constant/messages";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePickerController } from "../controllers/DatePickerController";
import { Button } from "../ui/button";
import { Loader2Icon } from "lucide-react";
import DropdownPassengers from "../controllers/DropdownPassenger";
import { Paxes } from "../controllers/dropdown/types";
import { getDestinies, getTourDestinies } from "@/services/zone";
import { format, parseISO } from "date-fns";
import { useRouter } from "next/navigation";

// Reusable schema for a zone reference
const zoneSchema = z.object({
  _id: z.string().trim().min(1, FIELD_REQUIRED),
  name: z.string().optional(),
});
// ISO date (YYYY-MM-DD) validation
const dateSchema = z.date(FIELD_REQUIRED);

const tourSchema = z
  .object({
    destiny: zoneSchema,
    date: dateSchema,
    /* paxes: z.object({
      adults: z.number().int().min(1, FIELD_REQUIRED),
      children: z.number().int().min(0).optional(),
      infant: z.number().int().min(0).optional(),
    }), */
  })
  .strict();

export type TourFormData = z.infer<typeof tourSchema>;

interface Props {
  className?: string;
  defaultInitial?: any;
}

export const TourBookingForm: React.FC<Props> = ({
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

  const onSubmit = async (values: TourFormData) => {
    const data: Record<string, unknown> = {};
    Object.entries(values).forEach(([key, value]) => {
      if (key === "date" && value instanceof Date) {
        data[key] = format(value, "yyyy-MM-dd");
      } else {
        data[key] = value;
      }
    });
    const params = new URLSearchParams({ booking: JSON.stringify(data) });
    router.push(`/tours?${params.toString()}`);
  };
  //console.log(defaultInitial);
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<TourFormData>({
    resolver: zodResolver(tourSchema),
    defaultValues: {
      destiny: defaultInitial?.destiny ?? "",
      date: defaultInitial?.date ? parseISO(defaultInitial.date) : new Date(),
      /* paxes: defaultInitial?.paxes || {
        adults: 1,
        children: 0,
        infant: 0,
      }, */
    },
  });
  console.log(errors);
  return (
    <form className={className} onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1 md:col-span-2">
          <AsyncSelectController
            name="destiny"
            label="Destino"
            control={control}
            fnFilter={getTourDestinies}
            query={"page=1&max=10"}
            value={
              defaultInitial?.destiny
                ? {
                    value: defaultInitial.destiny._id,
                    label: defaultInitial.destiny.name,
                  }
                : null
            }
            error={errors.destiny?._id?.message}
          />
        </div>
        <div className="col-span-1">
          <div className="flex flex-col md:flex-row gap-3 items-baseline-last">
            <div className="flex-1">
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
            </div>
          </div>
        </div>
        {/* <div className="col-span-1">
          
          <DropdownPassengers
            paxes={paxes}
            onPaxesChange={(paxes: Paxes) => {
              setValue("paxes", paxes);
              setPaxes(paxes);
            }}
          />
        </div> */}
      </div>
    </form>
  );
};
