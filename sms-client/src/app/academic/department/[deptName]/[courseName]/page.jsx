const page = ({ params }) => {
  const { courseName, section } = params;
  return <div>Department-{courseName}</div>;
};

export default page;
