const page = ({ params }) => {
  const { section } = params;
  return <div>Section-{section}</div>;
};

export default page;
