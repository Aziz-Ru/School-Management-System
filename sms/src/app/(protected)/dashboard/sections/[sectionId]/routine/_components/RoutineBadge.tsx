import { Badge } from "@/components/ui/badge";

const RoutineBadge = ({
  time,
  subjectName,
  teacherShortName,
}: {
  time: string;
  subjectName: string;
  teacherShortName: string;
}) => {
  return (
    <Badge className="bg-blue-100 text-black hover:bg-blue-200">
      {time} - {subjectName} {teacherShortName && `(${teacherShortName})`}
    </Badge>
  );
};

export default RoutineBadge;
