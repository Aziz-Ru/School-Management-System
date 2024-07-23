"use client";
const page = () => {
  const LoginHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const uid = formData.get("uid");
    const password = formData.get("password");
    const userType = formData.get("userType");
  };
  
  return (
    <section className="my-6 flex justify-center items-center min-h-[620px]">
      <form
        className="border-2 px-6 py-4 font-serif w-[400px] rounded-md"
        onSubmit={LoginHandler}
      >
        <div>
          <h1 className="text-3xl text-center font-bold">Login Form</h1>
        </div>
        <div className="flex flex-col gap-2 text-xl mt-2">
          <label htmlFor="uid" className="">
            User ID
          </label>
          <input
            type="text"
            id="uid"
            name="uid"
            required
            className="border p-2 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2 text-xl mt-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            minLength={6}
            required
            className="border p-2 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2 text-xl mt-2">
          <select name="userType" className="p-2">
            <option value="Student">Student</option>
            <option value="Employee">Employee</option>
          </select>
        </div>
        <input
          type="submit"
          value="Login"
          className="text-xl mt-4 rounded-md py-2 bg-blue-700 w-full text-white"
        />
      </form>
    </section>
  );
};

export default page;
