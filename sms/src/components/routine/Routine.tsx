import { courses, days } from "./data";
import Row from "./Row";
interface courseProps {
  id: string;
  courseName: string;
}

const Routine = () => {
  const hours = Array.from({ length: 9 }, (_, i) => (i + 8) % 12 || 12);

  const hoursLength = hours.length;

  return (
    <div className="w-full  rounded shadow site-bg">
      <table className="w-full site-txt">
        <thead>
          <tr
            className={`grid grid-cols-${
              hoursLength + 1
            } rounded site-bg site-txt border-y site-border`}
          >
            <td className="ease relative text-center border-x border-b site-border p-1">
              <span className="hidden">Day-Hour</span>
            </td>
            {hours.map((hour, hourIndex) => {
              return (
                <td
                  key={hourIndex}
                  className="ease relative text-center border-x  site-border p-1"
                >
                  {hour}
                </td>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {days.map((day, indx) => {
            const course = courses.filter((course) => course.day === day);

            return (
              <Row
                gridCol={hoursLength + 1}
                key={indx}
                dayName={day}
                dayEvent={course[0]}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Routine;
