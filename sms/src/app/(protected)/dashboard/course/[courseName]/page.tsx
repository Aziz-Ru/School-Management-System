const Course = async ({ params }: { params: { courseName: string } }) => {
  return (
    <div className="p-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-4">{params.courseName} Teachers</h1>
      <div className="flex flex-wrap gap-8">
        {/* {teachers?.map((teacher, index) => (
          <Teacher_card key={index} profile={teacher} />
        ))} */}
      </div>
    </div>
  );
};

export default Course;
