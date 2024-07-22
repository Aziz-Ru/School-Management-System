const page = ({ params }) => {
  const { deptName } = params;
  return <div>Section-{deptName}</div>;
};

export default page;
