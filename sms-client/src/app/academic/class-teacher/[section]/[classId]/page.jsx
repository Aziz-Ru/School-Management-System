const page = ({ params }) => {
  const { section, classId } = params;
  return (
    <div>
      Class Teacher-{section}-{classId}
    </div>
  );
};

export default page;
