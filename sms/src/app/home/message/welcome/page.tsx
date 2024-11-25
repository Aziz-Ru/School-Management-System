import { Card } from "@/components/ui/card";
import { SCHOOL_INTRO, SCHOOL_NAME } from "@/lib/data";

const page = () => {
  return (
    <div className="mt-10">
      <Card className="px-6 md:px-8 py-4">
        <h2 className="font-bold text-xl text-center py-4 text-gray-900">
          Welcome To {SCHOOL_NAME}
        </h2>
        <p className="text-justify text-gray-600">{SCHOOL_INTRO}</p>
      </Card>
    </div>
  );
};

export default page;
