import { useEffect, useState } from "react";

function App() {
  const [IsVisiable, setIsVisiable] = useState(false);
  const [windowWidth, setwindowWidth] = useState(window.innerWidth);
  const handleVisibale = () => {
    console.log("FIrst");
    setIsVisiable((prev) => !prev);
  };
  useEffect(() => {
    const checkWindowWidth = () => {
      if (window.innerWidth >= windowWidth) {
        setIsVisiable(true);
        setwindowWidth(window.innerWidth);
      }
    };
    checkWindowWidth();
    window.addEventListener("resize", checkWindowWidth);
    return () => {
      window.removeEventListener("resize", checkWindowWidth);
    };
  }, [IsVisiable, windowWidth]);

  return (
    <>
      <div className="grid grid-cols-12 grid-rows-12 h-full">
        <div className="col-span-12 ">
          <button
            className="border-2 px-6 py-1 md:hidden"
            onClick={() => handleVisibale()}
          >
            show
          </button>
          <h1>Header</h1>
        </div>
        {IsVisiable && (
          <div
            className={`absolute top-20 w-full h-screen md:top-0 sm:block md:relative  col-span-2 row-span-12 bg-indigo-400`}
          >
            div1
          </div>
        )}
        <div className="col-span-12 md:col-span-10 lg:col-span-8 row-span-12 bg-yellow-300">
          div2
        </div>
        <div className="hidden lg:block col-span-2 row-span-12 bg-red-400">
          div3
        </div>
      </div>
    </>
  );
}

export default App;
