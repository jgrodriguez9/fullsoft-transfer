import { FC } from "react";
import { Label } from "../ui/Label";
import { Input } from "../ui/input";

interface Props extends React.ComponentProps<"input"> {
  error?: string;
  label: string;
}

const InputController: FC<Props> = ({
  name,
  type = "text",
  required,
  error,
  label,
  placeholder,
  ...props
}) => {
  return (
    <div className="flex flex-col flex-1 gap-2">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        error={error}
        {...props}
      />
    </div>
  );
};

export default InputController;
