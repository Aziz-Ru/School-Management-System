import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";
const Icon = ({ name, size }: { name: keyof typeof Icons; size: number }) => {
  const LucideIcon = Icons[name] as LucideIcon;
  return <LucideIcon color="#000000" size={size} />;
};

export default Icon;
