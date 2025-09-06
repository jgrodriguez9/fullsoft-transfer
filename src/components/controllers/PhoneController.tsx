/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import PhoneInput from "react-phone-input-2";
import { Controller, Control } from "react-hook-form";

import "react-phone-input-2/lib/style.css";
import { cn } from "@/libs/utils";
import { Label } from "../ui/Label";

interface Props {
  error?: string;
  label: string;
  control: Control<any>;
  name: string;
}

const PhoneController: FC<Props> = ({ error, name, label, control }) => {
  return (
    <div className="flex flex-col flex-1 gap-2">
      <Label htmlFor={name}>{label}</Label>
      <div className="flex flex-col items-start">
        <Controller
          name={name}
          control={control}
          rules={{ required: "Phone number is required" }}
          render={({ field }) => (
            <PhoneInput
              country="mx"
              value={field.value}
              onChange={(value) => field.onChange(value)}
              inputClass={cn(
                "!w-full file:text-foreground placeholder:text-muted-foreground selection:bg-primary border-input selection:text-primary-foreground dark:bg-input/30 !border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
              )}
              buttonClass="!border-input !bg-transparent"
              containerClass="w-full"
              inputProps={{
                name,
              }}
            />
          )}
        />
        {error && <span className="mt-1 text-sm text-red-600">{error}</span>}
      </div>
    </div>
  );
};

export default PhoneController;
