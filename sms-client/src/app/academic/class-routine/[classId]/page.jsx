import Routine from "./routine.json";

const page = ({ params }) => {
  const { classId } = params;
  const classID = parseInt(classId) - 1;
  const routine = Routine[classID];
  console.log(routine.sections);
  return (
    <section className="flex flex-col">
      <div className="my-4">
        <h1 className="text-4xl font-bold text-center">{routine.className}</h1>
      </div>
      <div>
        {routine.sections.map((section, ind1) => {
          return (
            <div key={ind1}>
              {section.sectionName}
              <div>
                {section.days.map((day, ind2) => {
                  return <div key={ind2}>{day.dayName}</div>;
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default page;
