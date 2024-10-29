import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";

export default function FormSelect({
  name,
  label,
  options,
  onChange,
}: {
  name: string;
  label: string;
  options: string[];
  onChange?: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-3 mb-4">
      <Label>{label}</Label>
      <Select name={name} required={true}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={`Select ${label} `} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option, index) => (
              <SelectItem key={index} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
