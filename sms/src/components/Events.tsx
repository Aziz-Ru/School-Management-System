import More from "./More";

const Events = () => {
  const events = [
    {
      id: 1,
      title: "Event 1",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.consectetur adipisicing elitconsectetur adipisicing elitconsectetur adipisicing elitconsectetur adipisicing elit ",
      time: "12:00PM-02:00",
    },
    {
      id: 2,
      title: "Event 2",
      description: "Lorem ipsum dolor sit amet ",
      time: "10:00AM-12:00PM",
    },
    {
      id: 3,
      title: "Event 3",
      description: "Lorem ipsum dolor sit amet",
      time: "09:00AM-02:00PM",
    },
  ];
  return (
    <div className="shadow p-4 w-full rounded">
      <div className="flex items-center justify-between px-1 relative">
        <h1 className="text-2xl font-semibold ">Events</h1>
        <More />
      </div>
      <hr className="border-gray-500" />

      <div className="w-full mt-4 flex flex-col gap-4 site-txt">
        {/* Events */}
        {events.map((event) => (
          <div
            key={event.id}
            className="site-bg rounded-md  p-3 border site-border shadow"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium">{event.title}</h2>
              <span className="text-sm text-gray-500">{event.time}</span>
            </div>
            <div className="mt-1">
              <p className="text-gray-600 text-justify">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
