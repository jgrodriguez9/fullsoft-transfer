"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useRef } from "react";
import AsyncSelect from "react-select/async";
import { SingleValue } from "react-select";
import type { GroupBase, OptionsOrGroups } from "react-select";
import { SelectOption } from "@/types";
import { cn } from "@/libs/utils";
import { useController } from "react-hook-form";
import { Label } from "../ui/Label";

interface Props<T = any> {
  name: string;
  error?: string;
  label: string;
  placeholder?: string;
  control: any;
  isClearable?: boolean;
  fnFilter: (query: string) => Promise<T>;
  query: string;
  keyCompare?: string;
  keyProperty?: keyof T | string;
  startHeader?: string;
  value: SelectOption | null;
}
const customClassNames = {
  control: ({ isFocused, isDisabled }: any) =>
    cn(
      "!h-[45px] placeholder:text-muted-foreground !border-input selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 !rounded-md border bg-transparent text-base transition-[color,box-shadow] outline-none file:inline-flex disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
      "focus-visible:ring-ring/50 focus-visible:ring-[3px]",
      "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
      isFocused && "!border-ring ring-ring/50 !ring-[3px]",
      isDisabled && "!opacity-50 !cursor-not-allowed"
    ),
  placeholder: () => "text-muted-foreground",
  input: () => "text-foreground",
  singleValue: () => "text-foreground",
  menu: () => "mt-1 rounded-md border border-input bg-popover shadow-md",
};
const MESSAGE = {
  initial: "Buscar...",
  noOption: "No opciones, intente otra búsqueda",
  networkError: "Error de red, intente más tarde",
};
function getValueFromPath<T extends Record<string, any>>(
  obj: T,
  path: string
): any {
  const keys = path.split(".");
  let value: any = obj;

  for (const key of keys) {
    if (value && typeof value === "object") {
      value = value[key];
    } else {
      return undefined;
    }
  }

  return value;
}
const AsyncSelectController: FC<Props> = ({
  name,
  error,
  label,
  placeholder = "Seleccionar",
  control,
  isClearable = false,
  fnFilter,
  query,
  keyCompare = "search",
  keyProperty = "name",
  startHeader = undefined,
  value = null,
}) => {
  const messageRef = useRef(MESSAGE.noOption);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const { field } = useController({ name, control });
  const handleChangeVal = (val: SingleValue<SelectOption>) => {
    console.log(val);
    if (val) {
      field.onChange(val);
    } else {
      field.onChange("");
    }
  };

  const loadOptionsWithDebounce = (
    keyword: string,
    callback: (options: OptionsOrGroups<any, GroupBase<any>>) => void
  ) => {
    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      fnFilter(`${query}&${keyCompare}=${keyword}`)
        .then((options) => {
          if (!options.data?.length) {
            messageRef.current = MESSAGE.noOption;
          }
          callback(
            options.data.map((it: any) => ({
              label: startHeader
                ? `(${getValueFromPath(it, startHeader)}) ${
                    it[keyProperty as keyof typeof it]
                  }`
                : it[keyProperty as keyof typeof it],
              value: it._id,
              ...it,
            }))
          );
        })
        .catch(() => {
          messageRef.current = MESSAGE.networkError;
          callback([]);
        });
    }, 300);
  };

  return (
    <div className="flex flex-col flex-1 gap-2">
      <Label htmlFor={name}>{label}</Label>
      <div className="flex flex-col">
        <AsyncSelect
          cacheOptions
          noOptionsMessage={({ inputValue }) =>
            inputValue ? messageRef.current : MESSAGE.initial
          }
          defaultValue={value}
          defaultOptions
          loadOptions={loadOptionsWithDebounce}
          classNames={customClassNames}
          isClearable={isClearable}
          onChange={(val) => handleChangeVal(val)}
          placeholder={placeholder}
          loadingMessage={() => (
            <div role="status" className="spinner-border text-primary fs-6">
              <span className="visually-hidden">Buscando...</span>
            </div>
          )}
        />
        {error && <span className="mt-1 text-sm text-red-600">{error}</span>}
      </div>
    </div>
  );
};

export default AsyncSelectController;
