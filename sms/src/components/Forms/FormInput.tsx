import { Input } from "../ui/input";
import { Label } from "../ui/label";

const FormInput = ({
  type,
  name,
  label,
  value,
  required,
  disabled = false,
  width = "w-1/2",
}: {
  type: string;
  name: string;
  value?: string;
  required: boolean;
  disabled?: boolean;
  label: string;
  width?: string;
}) => {
  return (
    <div className={`${width} flex flex-col mb-4 gap-2`}>
      <Label htmlFor={label}>{label}</Label>
      <Input
        className="w-full"
        type={type}
        id={label}
        disabled={disabled}
        defaultValue={value}
        name={name}
        required={required}
        placeholder={`Enter ${label}`}
      />
    </div>
  );
};

export default FormInput;
