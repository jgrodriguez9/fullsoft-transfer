"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FIELD_REQUIRED } from "@/constant/messages";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePickerController } from "../controllers/DatePickerController";
import { Button } from "../ui/button";
import { Loader2Icon } from "lucide-react";
import { format, parseISO } from "date-fns";
import { useRouter } from "next/navigation";
import ComboBoxController from "../controllers/SelectSimpleController";
import { citiesMexicoOptions } from "@/constant/cities";

// ISO date (YYYY-MM-DD) validation
const dateSchema = z.date(FIELD_REQUIRED);

const schema = z
  .object({
    city: z.string().trim().min(1, FIELD_REQUIRED),
    date: dateSchema,
  })
  .strict();

export type HotelFormData = z.infer<typeof schema>;

interface Props {
  className?: string;
  defaultInitial?: any;
}

export const HotelsBookingForm: React.FC<Props> = ({
  className = "bg-white p-6 rounded-lg shadow-lg max-w-2xl",
  defaultInitial = undefined,
}) => {
  const router = useRouter();

  const onSubmit = async (values: HotelFormData) => {
    const data: Record<string, unknown> = {};
    Object.entries(values).forEach(([key, value]) => {
      if (key === "date" && value instanceof Date) {
        data[key] = format(value, "yyyy-MM-dd");
      } else {
        data[key] = value;
      }
    });
    const params = new URLSearchParams({ booking: JSON.stringify(data) });
    router.push(`/daypass?${params.toString()}`);
  };
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<HotelFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      city: defaultInitial?.city ?? "",
      date: defaultInitial?.date ? parseISO(defaultInitial.date) : new Date(),
    },
  });
  return (
    <form className={className} onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1 md:col-span-2">
          <ComboBoxController
            name="city"
            label="Destino"
            control={control}
            options={citiesMexicoOptions}
            placeholder="Selecciona un destino"
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
                dateFormat="d MMM yyyyy"
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
