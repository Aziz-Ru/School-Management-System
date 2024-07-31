const page = ({ params }) => {
  const { slug } = params;
  return (
    <div>
      <h1 className="text-2xl">School Page {slug}</h1>
    </div>
  );
};

export default page;
