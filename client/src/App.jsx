import { useEffect, useState } from "react";

function App() {
  const [IsVisiable, setIsVisiable] = useState(false);
  const handleVisibale = () => {
    console.log("FIrst");
    setIsVisiable((prev) => !prev);
  };
  useEffect(() => {
    console.log("second");
    const checkWindowWidth = () => {
      if (window.innerWidth >= 768) {
        setIsVisiable(true);
      } else {
        if (window.innerWidth < 768 && !IsVisiable) {
          setIsVisiable(false);
        }
      }
    };
    checkWindowWidth();
    window.addEventListener("resize", checkWindowWidth);
    return () => {
      window.removeEventListener("resize", checkWindowWidth);
    };
  }, [IsVisiable]);

  return (
    <>
      <div className="grid grid-cols-12 grid-rows-12 h-screen">
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
          <div className={`md:block col-span-2 row-span-12 bg-indigo-400`}>
            div1
          </div>
        )}
        <div className="col-span-12 md:col-span-8 row-span-12 bg-yellow-300">
          div2
        </div>
        <div className="hidden md:block col-span-2 row-span-12 bg-red-400">
          div3
        </div>
      </div>
    </>
  );
}

export default App;
