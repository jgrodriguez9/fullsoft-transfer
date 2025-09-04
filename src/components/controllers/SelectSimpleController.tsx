import { cn } from "@/libs/utils";
import { SelectOption } from "@/types";
import { FC } from "react";
import { useController } from "react-hook-form";
import Select, { SingleValue } from "react-select";
import { Label } from "../ui/Label";

interface Props extends React.ComponentProps<"select"> {
  name: string;
  error?: string;
  label: string;
  placeholder?: string;
  control: any;
  isClearable?: boolean;
  options: SelectOption[];
}
const customClassNames = {
  control: ({ isFocused, isDisabled }: any) =>
    cn(
      "!h-[45px] placeholder:text-muted-foreground !border-input selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 !rounded-md border bg-transparent text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
      "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
      "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
      isFocused && "!border-ring ring-ring/50 !ring-[3px]",
      isDisabled && "!opacity-50 !cursor-not-allowed"
    ),
  placeholder: () => "text-muted-foreground",
  input: () => "text-foreground",
  singleValue: () => "text-foreground",
  menu: () => "mt-1 rounded-md border border-input bg-popover shadow-md",
};
const ComboBoxController: FC<Props> = ({
  name,
  error,
  label,
  placeholder = "Seleccionar",
  control,
  isClearable = false,
  options,
}) => {
  const { field } = useController({ name, control });
  const handleChangeVal = (val: SingleValue<SelectOption>) => {
    field.onChange(val?.value ?? "");
  };
  return (
    <div className="flex flex-col flex-1 gap-2">
      <Label htmlFor={name}>{label}</Label>
      <div className="flex flex-col">
        <Select
          classNames={customClassNames}
          options={options}
          isClearable={isClearable}
          onChange={(val) => handleChangeVal(val)}
          placeholder={placeholder}
          value={
            options
              ? options.find((option) => option.value === field.value)
              : null
          }
        />
        {error && <span className="mt-1 text-sm text-red-600">{error}</span>}
      </div>
    </div>
  );
};

export default ComboBoxController;
