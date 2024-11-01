const Course = ({ params }: { params: { courseName: string } }) => {
  return <div>Course{params.courseName}</div>;
};

export default Course;
