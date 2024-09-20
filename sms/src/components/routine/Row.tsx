interface dayEventProps {
  day: string;
  hours: {
    startTime: string;
    endTime: string;
    course: string;
    teacher: string;
  }[];
}

const Row = ({
  gridCol,
  dayName,
  dayEvent,
}: {
  dayEvent: any;
  gridCol: number;
  dayName: string;
}) => {
  if (dayEvent === undefined) {
    return (
      <tr
        className={`grid grid-cols-${gridCol} rounded site-bg site-txt border-x border-b site-border`}
      >
        <td className="py-2 border-r site-border text-center">
          <span className="2xl:block hidden font-medium">{dayName}</span>
          <span className="2xl:hidden font-medium">
            {dayName.substring(0, 3)}
          </span>
        </td>
      </tr>
    );
  }

  const classHours = dayEvent.hours;
  // console.log(classHours);
  const hours = Array.from({ length: 9 }, (_, i) => (i + 8) % 12 || 12);

  return (
    <tr
      className={`grid grid-cols-${gridCol} rounded site-bg site-txt border-x border-b site-border`}
    >
      <td className="py-2 border-r site-border text-center">
        <span className="2xl:block hidden font-medium">{dayName}</span>
        <span className="2xl:hidden font-medium">
          {dayName.substring(0, 3)}
        </span>
      </td>

      {hours.map((hour, hourIndex) => {
        const hourString = hour.toString().length === 1 ? `0${hour}` : hour;
        const time = `${hourString}:00`;
        const classHour = classHours.find(
          (classHour: any) => classHour.startTime === time
        );
        if (classHour) {
          return (
            <td key={hourIndex} className="border-r site-border text-center">
              <span className="flex flex-col font-medium ">
                <span>{classHour.course}</span>
                <span>{classHour.teacher}</span>
              </span>
            </td>
          );
        }
        return (
          <td key={hourIndex} className="border-r site-border text-center">
            <span className="block font-medium"></span>
          </td>
        );
      })}
    </tr>
  );
};

export default Row;
