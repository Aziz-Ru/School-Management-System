import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";
const Icon = ({
  name,
  size,
  className = "text-white",
}: {
  name: keyof typeof Icons;
  size: number;
  className?: string;
}) => {
  const LucideIcon = Icons[name] as LucideIcon;
  return <LucideIcon className={className} size={size} />;
};

export default Icon;
