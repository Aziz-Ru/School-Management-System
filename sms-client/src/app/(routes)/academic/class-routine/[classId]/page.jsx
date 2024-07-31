import AllRoutine from "./routine.json";
const page = ({ params }) => {
  const { classId } = params;

  const routine = AllRoutine[parseInt(classId) - 1];

  return (
    <div>
      {routine.sections.map((section, ind1) => {
        return (
          <table key={ind1} className="my-4 mx-6">
            <span className="text-xl font-bold">{section.sectionName}</span>
            {section.days.map((day, ind2) => {
              return (
                <tr key={ind2}>
                  <td>{day.name}</td>
                  {day.courses.map((course, ind3) => {
                    return (
                      <td key={ind3} className="px-6 py-2 ">
                        {course.name}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </table>
        );
      })}
    </div>
  );
};

export default page;
