import DatePicker from "react-datepicker";
import { Label } from "../ui/Label";
import { useController } from "react-hook-form";
import { Calendar } from "lucide-react";

interface DatePickerControllerProps {
  name: string;
  error?: string;
  label: string;
  selectedDate?: Date | null;
  placeholderText?: string;
  control: any;
  dateFormat?: string;
  minDate?: Date;
}

export const DatePickerController = ({
  name,
  error,
  label,
  selectedDate = null,
  placeholderText,
  control,
  dateFormat = "dd-MM-yyyy",
  minDate = undefined,
}: DatePickerControllerProps) => {
  const { field } = useController({ name, control });
  const handleChangeVal = (val: Date | null) => {
    field.onChange(val ?? "");
  };
  return (
    <div className="flex flex-col flex-1 gap-2">
      <Label htmlFor={name}>{label}</Label>
      <div className="flex flex-col">
        <DatePicker
          selected={field.value ? field.value : selectedDate}
          onChange={handleChangeVal}
          className="w-full h-[45px] text-[14px] !pl-9 p-2 border !border-input focus-visible:ring-ring/50 focus-visible:ring-[3px] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-600 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
          wrapperClassName="[&_div]:flex [&_div]:items-center"
          calendarClassName="bg-white p-2 rounded-md shadow-lg [&_*]:m-[3px]"
          dateFormat={dateFormat}
          placeholderText={placeholderText}
          showTimeSelect={false}
          showIcon
          icon={<Calendar className="me-2 size-8" />}
          minDate={minDate}
        />
        {error && <span className="mt-1 text-sm text-red-600">{error}</span>}
      </div>
    </div>
  );
};
