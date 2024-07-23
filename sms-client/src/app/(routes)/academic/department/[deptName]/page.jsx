import TeacherCard from "@/app/_components/TeacherCard";
import department from "./dept.json";
const page = ({ params }) => {
  const { deptName } = params;
  let dept;
  if (deptName == "science") dept = department[0];
  if (deptName == "commerce") dept = department[1];
  if (deptName == "humanities") dept = department[2];
  if (deptName == "general") dept = department[3];

  return (
    <section>
      <aside>
        <h1 className="font-serif font-bold text-4xl text-center">
          {dept.name} Department
        </h1>
      </aside>
      <aside>
        {dept.courses?.map((course, ind) => {
          return (
            <div
              className="font-serif flex flex-col justify-center items-center my-3"
              key={course.id}
            >
              <div>
                <h1 className="text-2xl font-bold">{course.name}</h1>
              </div>

              <div className="flex">
                {course.teachers.map((teacher, ind1) => {
                  return <TeacherCard key={teacher.id} teacher={teacher} />;
                })}
              </div>
            </div>
          );
        })}
      </aside>
    </section>
  );
};

export default page;
