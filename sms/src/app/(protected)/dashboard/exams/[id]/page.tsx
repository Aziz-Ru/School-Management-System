const Exam = async ({ params }: { params: { id: string } }) => {
  return <div className="">{params.id}</div>;
};

export default Exam;
