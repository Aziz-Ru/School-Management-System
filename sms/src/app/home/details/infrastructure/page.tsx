import { Infrastructures } from "@/lib/data";

const Infrasturcture = () => {
  return (
    <div className="mx-auto max-w-screen-xl">
      <div className="p-10">
        <div className="">
          {Infrastructures.map((infa, index) => {
            return (
              <div key={index}>
                <h1 className="text-xl font-bold">{infa.title}:</h1>
                <div className="">
                  <ul className="ml-10">
                    {infa.items.map((item, index) => {
                      return (
                        <li className="list-disc my-2" key={index}>
                          {item.content}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Infrasturcture;
