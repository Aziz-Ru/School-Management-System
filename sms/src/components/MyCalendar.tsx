import { updateTimeSlot } from "@/actions/SectionRoutine";

const hours = [
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

const days = [
  "SATUREDAY",
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
];
const data = [
  {
    day: "SATUREDAY",
    timeslots: [
      {
        subject: "Math",
        startTime: "9:00 AM",
        endTime: "10:00 AM",
        teacher: "Mr. A",
      },
      {
        subject: "Physics",
        startTime: "10:00 AM",
        endTime: "11:00 AM",
        teacher: "Ms. B",
      },
    ],
  },
  {
    day: "SUNDAY",
    timeslots: [
      {
        subject: "English",
        startTime: "9:00 AM",
        endTime: "10:00 AM",
        teacher: "Mr. C",
      },
      {
        subject: "Biology",
        startTime: "11:00 AM",
        endTime: "12:00 AM",
        teacher: "Ms. D",
      },
    ],
  },
  {
    day: "MONDAY",
    timeslots: [
      {
        subject: "English",
        startTime: "9:00 AM",
        endTime: "10:00 AM",
        teacher: "Mr. C",
      },
      {
        subject: "Biology",
        startTime: "11:00 AM",
        endTime: "12:00 AM",
        teacher: "Ms. D",
      },
    ],
  },
];

const MyCalendar = ({ role }: { role?: string }) => {
  return (
    <div className="p-4 flex flex-col w-full">
      <div className="flex items-center justify-between">
        <h1>Schedule</h1>
      </div>
      <div className="py-2">
        <table className="w-full">
          <thead>
            <tr className="grid grid-cols-11 border site-border ">
              <th></th>
              {hours.map((hour, index) => (
                <th
                  className="table-cell border-x site-border p-1 xl:p-4 "
                  key={index}
                >
                  {hour}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((day, dayindex) => {
              return (
                <tr
                  className="grid grid-cols-11 border site-border"
                  key={dayindex}
                >
                  <td>
                    <span className="hidden xl:table-cell">{day.day}</span>
                    <span className="xl:hidden table-cell">
                      {day.day.substring(0, 3)}
                    </span>
                  </td>
                  {role?.includes("admin")
                    ? hours.map((hour, hourindex) => {
                        return (
                          <td key={hourindex}>
                            <form
                              action={updateTimeSlot}
                              className="p-0.5 flex flex-col items-start"
                            >
                              <input
                                type="text"
                                className="hidden"
                                name="startTime"
                                defaultValue={hour}
                              />

                              <select
                                name="courseId"
                                className="mb-1 site-bg w-full p-.5 outline-none"
                              >
                                <option value="Subject">Sub</option>
                                <option value="Math">Math</option>
                                <option value="Physics">Physics</option>
                                <option value="English">English</option>
                                <option value="Biology">Biology</option>
                              </select>
                              <select
                                name="teacherId"
                                className="mb-1 site-bg w-full p-.5 outline-none"
                              >
                                <option value="teacher">Teacher</option>
                                <option value="Mr. A">Mr. A</option>
                                <option value="Ms. B">Ms. B</option>
                                <option value="Mr. C">Mr. C</option>
                                <option value="Ms. D">Ms. D</option>
                              </select>
                              <input
                                type="submit"
                                className="w-full p-.5 bg-purple-50 dark:bg-zinc-600 border site-border rounded-md"
                                value="Add"
                              />
                            </form>
                          </td>
                        );
                      })
                    : hours.map((hour, hourindex) => {
                        const timeslot = day.timeslots.find(
                          (timeslot) => timeslot.startTime === hour
                        );
                        return (
                          <td
                            className="table-cell border-x site-border p-1 xl:p-4"
                            key={hourindex}
                          >
                            {timeslot ? (
                              <div>
                                <span className="font-semibold">
                                  {timeslot.subject}
                                </span>
                                <br />
                                <span className="text-xs text-gray-500">
                                  {timeslot.teacher}
                                </span>
                              </div>
                            ) : (
                              ""
                            )}
                          </td>
                        );
                      })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyCalendar;
