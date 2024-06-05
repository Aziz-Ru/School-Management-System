import { useState } from "react";

const Navabr = () => {
  const [navStyle, setnavStyle] = useState(true);
  const handleNavStyle = () => {
    setnavStyle((prev) => !prev);
  };

  return (
    <header className="">
      <div className="flex justify-between ">
        <div>
          <div className="text-roboto text-4xl p-4">SMS</div>
        </div>

        <div
          className={`absolute top-20 md:top-0 md:relative md:flex ${
            navStyle ? "" : "hidden"
          }`}
        >
          <nav className="w-screen md:w-fit ">
            <ul className="border-2 space-y-1 md:flex">
              <li className="">
                <div className="hover:bg-gray-300 px-2 py-2.5">Home</div>
              </li>
              <li>
                <div className="hover:bg-gray-300">Home</div>
              </li>
              <li>
                <div className="hover:bg-gray-300">Home</div>
              </li>
              <li className="hover:bg-gray-300">
                <div>Home</div>
              </li>
              <li>
                <div className="hover:bg-gray-300">Home</div>
              </li>
            </ul>
          </nav>
          <div>
            <ul className="flex gap-10">
              <li>Login</li>
              <li>Singup</li>
            </ul>
          </div>
        </div>

        <div className=" border border-black md:hidden">
          <button onClick={() => handleNavStyle()}>icon</button>
        </div>
      </div>
    </header>
  );
};

export default Navabr;
