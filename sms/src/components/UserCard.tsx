const UserCard = ({ type }: { type: string }) => {
  const date = new Date().toLocaleDateString();
  return (
    <div className="rounded odd:bg-purple-600 even:bg-yellow-500 px-4 py-2 text-white  flex-1  min-w-[130px]">
      <div className="flex justify-between items-center">
        <span className="text-[10px]  px-2 py-1">{date}</span>
      </div>
      <h1 className="text-2xl font-semibold py-1">1201</h1>
      <h1 className="text-md font-medium">{type}</h1>
    </div>
  );
};

export default UserCard;
