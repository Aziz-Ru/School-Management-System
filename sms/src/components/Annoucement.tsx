import More from "./More";

const Annoucement = () => {
  const annoucements = [
    {
      id: 1,
      title: "Annoucement 1",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.consectetur adipisicing elitconsectetur adipisicing elitconsectetur adipisicing elitconsectetur adipisicing elit ",
      time: "12:00PM-02:00",
    },
    {
      id: 2,
      title: "Annoucement 2",
      description: "Lorem ipsum dolor sit amet ",
      time: "10:00AM-12:00PM",
    },
    {
      id: 3,
      title: "Annoucement 3",
      description: "Lorem ipsum dolor sit amet",
      time: "09:00AM-02:00PM",
    },
  ];
  return (
    <div className="shadow p-4 w-full rounded mt-4">
      <div className="flex items-center justify-between px-1 relative">
        <h1 className="text-2xl font-semibold ">Annoucement</h1>
        <More />
      </div>
      <hr className="border-gray-500" />

      <div className="w-full mt-4 flex flex-col gap-4 site-txt">
        {/* Events */}
        {annoucements.map((annoucement) => (
          <div
            key={annoucement.id}
            className="odd:bg-sky-50 even:bg-red-50 p-3 rounded shadow"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium">{annoucement.title}</h2>
              <span className="text-sm text-gray-500">{annoucement.time}</span>
            </div>
            <div className="mt-1">
              <p className="text-gray-600 text-justify">
                {annoucement.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Annoucement;
