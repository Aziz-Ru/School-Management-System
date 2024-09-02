"use client";

const Student = () => {
  return (
    <section className="max-w-screen-xl mx-auto">
      <div className="max-w-screen-md mx-auto py-4">
        <form className="shadow border border-gray-200 dark:border-gray-700 p-2">
          <div>
            <h1 className="text-3xl font-extrabold text-center site-txt">
              School
            </h1>
            <p className="text-center text-red-600">Error message</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="w-full sm:w-1/2 my-3">
              <label htmlFor="firstname" className="mb-2.5 block site-txt">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstname"
                placeholder="Firstname"
                className="w-full site-bg site-txt rounded border border-gray-400 dark:border-gray-300 py-3 px-5 outline-none transition focus:border-blue-600 active:border-blue-600 "
              />
            </div>
            <div className="w-full sm:w-1/2 my-3">
              <label htmlFor="lastname" className="mb-2.5 block site-txt">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastname"
                placeholder="LastName"
                className="w-full site-bg site-txt rounded border border-gray-400 dark:border-gray-300 py-3 px-5 outline-none transition focus:border-blue-600 active:border-blue-600 "
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <div className="w-full sm:w-1/2 my-3">
              <label htmlFor="phone" className="mb-2.5 block site-txt">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                maxLength={12}
                placeholder="Phone Number"
                className="w-full site-bg site-txt rounded border border-gray-400 dark:border-gray-300 py-3 px-5 outline-none transition focus:border-blue-600 active:border-blue-600 "
              />
            </div>
            <div className="w-full sm:w-1/2 my-3">
              <label htmlFor="email" className="mb-2.5 block site-txt">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="w-full site-bg site-txt rounded border border-gray-400 dark:border-gray-300 py-3 px-5 outline-none transition focus:border-blue-600 active:border-blue-600 "
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-2">
            <div className="w-full lg:w-1/2 my-3">
              <label htmlFor="studentId" className="mb-2.5 block site-txt">
                Student ID
              </label>
              <input
                type="text"
                name="studentId"
                id="studentId"
                maxLength={20}
                placeholder="Student Id"
                className="w-full site-bg site-txt rounded border border-gray-400 dark:border-gray-300 py-3 px-5 outline-none transition focus:border-blue-600 active:border-blue-600 "
              />
            </div>

            <div className="w-full lg:w-1/2 my-3">
              <label htmlFor="phone" className="mb-2.5 block site-txt">
                Phone
              </label>
              <input
                type="number"
                name="phone"
                id="phone"
                maxLength={12}
                placeholder="Enter School Email"
                className="w-full site-bg site-txt rounded border border-gray-400 dark:border-gray-300 py-3 px-5 outline-none transition focus:border-blue-600 active:border-blue-600 "
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <div className="w-full sm:w-1/2 my-3">
              <label htmlFor="sex" className="mb-2.5 block site-txt">
                Sex
              </label>
              <select
                name="Sex"
                id=""
                className="w-full site-bg site-txt rounded border border-gray-400 dark:border-gray-300 py-3 px-5 outline-none transition focus:border-blue-600 active:border-blue-600 "
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="w-full sm:w-1/2 my-3">
              <label htmlFor="dob" className="mb-2.5 block site-txt">
                Date Of Birth
              </label>
              <input
                type="date"
                name="dob"
                id="dob"
                placeholder="Enter School EIIN Code"
                className="w-full site-bg site-txt rounded border border-gray-400 dark:border-gray-300 py-3 px-5 outline-none transition focus:border-blue-600 active:border-blue-600 "
              />
            </div>
          </div>
          <div>
            <div className="w-full my-3">
              <label htmlFor="class" className="mb-2.5 block site-txt">
                Class
              </label>
              <input
                type="text"
                name="address"
                id="address"
                max={20}
                placeholder="Enter School Adress"
                className="w-full site-bg site-txt rounded border border-gray-400 dark:border-gray-300 py-3 px-5 outline-none transition focus:border-blue-600 active:border-blue-600 "
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-5 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Save
          </button>
        </form>
      </div>
    </section>
  );
};

export default Student;
