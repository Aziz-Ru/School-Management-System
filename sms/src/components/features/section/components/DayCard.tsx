import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { MdAdd } from "react-icons/md";

const DayCard = () => {
  return (
    <Card className="p-3">
      <div className="flex justify-between">
        <CardTitle className="">SunDay</CardTitle>
        <Button>
          <MdAdd />
        </Button>
      </div>
      <CardContent className="flex flex-wrap gap-3">
        <Badge>9:30-10:30 Bangla(Teacher-1)</Badge>
        <Badge>9:30-10:30 Bangla(Teacher-1)</Badge>
        <Badge>9:30-10:30 Bangla(Teacher-1)</Badge>
        <Badge>9:30-10:30 Bangla(Teacher-1)</Badge>
        <Badge>9:30-10:30 Bangla(Teacher-1)</Badge>
        <Badge>9:30-10:30 Bangla(Teacher-1)</Badge>
      </CardContent>
    </Card>
  );
};

export default DayCard;
