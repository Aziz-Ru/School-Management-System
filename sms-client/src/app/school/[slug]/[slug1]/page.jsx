const page = ({ params }) => {
  const { slug, slug1 } = params;
  return <div>{slug1}</div>;
};

export default page;
