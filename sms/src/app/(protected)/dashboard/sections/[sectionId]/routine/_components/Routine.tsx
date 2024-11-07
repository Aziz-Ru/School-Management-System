import { courses } from "@/components/routine/data";
import { Schedule } from "@/utils/types";
import RoutineBadge from "./RoutineBadge";

const Routine = ({ schedules }: { schedules: Schedule[] }) => {
  const routine = schedules.map((schedule) => {
    return {
      day: schedule.day,
    };
  });
  console.log(routine);
  return (
    <div className="">
      {courses.map((course, index) => {
        return (
          <div
            key={index}
            className="flex gap-2 border border-gray-600 shadow-sm rounded my-2"
          >
            <div className="border-r border-gray-200 ">
              <div className=" p-4 flex items-center justify-center font-medium text-md">
                <span className="md:block hidden">{course.day}</span>
                <span className="md:hidden block">{course.day}</span>
              </div>
            </div>
            <div className="flex items-center flex-wrap gap-2 p-2">
              {course.hours.map((hour, index) => {
                return (
                  <RoutineBadge
                    key={index}
                    time={hour.startTime}
                    subjectName={hour.course}
                    teacherShortName={hour.teacher}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Routine;
