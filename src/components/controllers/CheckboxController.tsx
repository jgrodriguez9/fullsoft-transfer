import DatePicker from "react-datepicker";
import { Label } from "../ui/Label";
import { useController } from "react-hook-form";
import { Calendar } from "lucide-react";
import { Checkbox } from "../ui/checkbox";

interface Props {
  name: string;
  label: string;
  type?: "checkbox" | "radio";
  control: any;
}

export const CheckboxController = ({ name, label, control }: Props) => {
  const { field } = useController({ name, control });

  return (
    <div className="flex flex-row items-center space-x-2 space-y-0">
      <Checkbox
        name={name}
        checked={field.value}
        onCheckedChange={field.onChange}
      />
      <Label htmlFor={name}>{label}</Label>
    </div>
  );
};
