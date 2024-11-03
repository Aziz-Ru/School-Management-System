import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";
const Icon = ({
  name,
  size,
  color = "#000000",
}: {
  name: keyof typeof Icons;
  size: number;
  color?: string;
}) => {
  const LucideIcon = Icons[name] as LucideIcon;
  return <LucideIcon color={color} size={size} />;
};

export default Icon;
