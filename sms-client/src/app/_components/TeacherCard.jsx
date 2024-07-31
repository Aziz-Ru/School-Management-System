const TeacherCard = ({ teacher }) => {
  return (
    <div className="border px-6 py-3 flex gap-3 m-1 rounded-md shadow-sm">
      <div>
        {/* <Image src={"person.svg"} alt="Person" width={50} height={50} /> */}
      </div>
      <div>
        <p>Teacher ID:{teacher.id}</p>
        <p>Name:{teacher.name}</p>
      </div>
    </div>
  );
};

export default TeacherCard;
