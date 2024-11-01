import Icon from "@/components/LucidIcon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";

const DayCard = () => {
  return (
    <Card className="p-2 m-1">
      <div className="flex justify-between">
        <CardTitle className="">SunDay</CardTitle>
        <Button className="bg-sky-200">
          <Icon name="Plus" size={18} />
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        <Badge className="bg-red-200 text-black hover:bg-red-300">
          9:30-10:30 Bangla(Teacher-1)
        </Badge>
        <Badge className="bg-red-200 text-black hover:bg-red-300">
          9:30-10:30 Bangla(Teacher-1)
        </Badge>
        <Badge className="bg-red-200 text-black hover:bg-red-300">
          9:30-10:30 Bangla(Teacher-1)
        </Badge>
        <Badge className="bg-red-200 text-black hover:bg-red-300">
          9:30-10:30 Bangla(Teacher-1)
        </Badge>
        <Badge className="bg-red-200 text-black hover:bg-red-300">
          9:30-10:30 Bangla(Teacher-1)
        </Badge>
        <Badge className="bg-red-200 text-black hover:bg-red-300">
          9:30-10:30 Bangla(Teacher-1)
        </Badge>
      </div>
    </Card>
  );
};

export default DayCard;
