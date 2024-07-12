const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-4 py-4">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 283 64"
          width={200}
        >
          <path
            fill="black"
            d="M141 16c-11 0-19 7-19 18s9 18 20 18c7 0 13-3 16-7l-7-5c-2 3-6 4-9 4-5 0-9-3-10-7h28v-3c0-11-8-18-19-18zm-9 15c1-4 4-7 9-7s8 3 9 7h-18zm117-15c-11 0-19 7-19 18s9 18 20 18c6 0 12-3 16-7l-8-5c-2 3-5 4-8 4-5 0-9-3-11-7h28l1-3c0-11-8-18-19-18zm-10 15c2-4 5-7 10-7s8 3 9 7h-19zm-39 3c0 6 4 10 10 10 4 0 7-2 9-5l8 5c-3 5-9 8-17 8-11 0-19-7-19-18s8-18 19-18c8 0 14 3 17 8l-8 5c-2-3-5-5-9-5-6 0-10 4-10 10zm83-29v46h-9V5h9zM37 0l37 64H0L37 0zm92 5-27 48L74 5h10l18 30 17-30h10zm59 12v10l-3-1c-6 0-10 4-10 10v15h-9V17h9v9c0-5 6-9 13-9z"
          />
        </svg>
      </div>
      <div>
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-green-600 text-4xl font-bold">
            <div className="flex flex-col justify-center items-center">
              <span>Cantonment Public School & </span>
              <span>College, Rangpur.</span>
            </div>
          </h1>
          <div>
            <div className="text-xl text-indigo-600 font-semibold flex gap-2">
              <span>Education</span>
              <span>|</span>
              <span>Morality</span>
              <span>|</span>
              <span>Discipline</span>
            </div>
            <div className="text-xl font-semibold flex gap-2">
              <span>School Code:xxyy</span>
              <span>|</span>
              <span>EIIN:xxyyuuiid</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
