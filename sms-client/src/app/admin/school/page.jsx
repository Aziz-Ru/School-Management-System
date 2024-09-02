"use client";

import { useEffect, useReducer } from "react";

const initialState = {
  school: {},
  loading: false,
  error: null,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "SUCCESS":
      return {
        error: "",
        loading: false,
        school: action.payload,
      };
    case "FAILURE":
      return {
        error: "Failed",
        loading: false,
        school: {},
      };
    default:
      return state;
  }
};

const SchoolPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchSchool = async () => {
      try {
        dispatch({ type: "REQUEST" });
        const response = await fetch("/api/admin/school");
        const data = await response.json();
        dispatch({ type: "SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FAILURE" });
      }
    };
    fetchSchool();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    try {
      dispatch({ type: "REQUEST" });
      const response = await fetch("/api/admin/school", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result);
      if (result.error) {
        dispatch({ type: "FAILURE" });
      } else {
        dispatch({ type: "SUCCESS", payload: result });
      }
    } catch (error) {
      dispatch({ type: "FAILURE" });
    }
  };

  return (
    <section className="max-w-screen-xl mx-auto">
      <div className="max-w-screen-md mx-auto py-4">
        <form onSubmit={handleSubmit} className="shadow p-2">
          <div>
            <h1 className="text-3xl font-extrabold text-center">School</h1>
            <p className="text-center text-red-600">{state.error}</p>
          </div>
          <div className="w-full my-3">
            <label htmlFor="name" className="mb-2.5 block site-txt">
              School Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              defaultValue={state.school.name}
              placeholder="Enter School Name"
              className="w-full site-bg site-txt rounded border border-gray-400 dark:border-gray-300 py-3 px-5 outline-none transition focus:border-blue-600 active:border-blue-600 "
            />
          </div>
          <div className="flex flex-col lg:flex-row gap-2">
            <div className="w-full lg:w-1/2 my-3">
              <label htmlFor="email" className="mb-2.5 block site-txt">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                defaultValue={state.school.email}
                max={50}
                placeholder="Enter School Email"
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
                defaultValue={state.school.phone}
                placeholder="Enter School Email"
                className="w-full site-bg site-txt rounded border border-gray-400 dark:border-gray-300 py-3 px-5 outline-none transition focus:border-blue-600 active:border-blue-600 "
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-2">
            <div className="w-full lg:w-1/2 my-3">
              <label htmlFor="schoolcode" className="mb-2.5 block site-txt">
                School Code
              </label>
              <input
                type="text"
                name="schoolCode"
                id="schoolcode"
                defaultValue={state.school.schoolCode}
                max={20}
                placeholder="Enter School Code"
                className="w-full site-bg site-txt rounded border border-gray-400 dark:border-gray-300 py-3 px-5 outline-none transition focus:border-blue-600 active:border-blue-600 "
              />
            </div>
            <div className="w-full lg:w-1/2 my-3">
              <label htmlFor="eiin" className="mb-2.5 block site-txt">
                EIIN Code
              </label>
              <input
                type="text"
                name="EIIN"
                max={20}
                defaultValue={state.school.EIIN}
                id="eiin"
                placeholder="Enter School EIIN Code"
                className="w-full site-bg site-txt rounded border border-gray-400 dark:border-gray-300 py-3 px-5 outline-none transition focus:border-blue-600 active:border-blue-600 "
              />
            </div>
          </div>
          <div className="w-full my-3">
            <label htmlFor="address" className="mb-2.5 block site-txt">
              Address
            </label>
            <input
              type="text"
              name="address"
              id="address"
              defaultValue={state.school.address}
              max={20}
              placeholder="Enter School Adress"
              className="w-full site-bg site-txt rounded border border-gray-400 dark:border-gray-300 py-3 px-5 outline-none transition focus:border-blue-600 active:border-blue-600 "
            />
          </div>
          <div className="w-full my-3">
            <label htmlFor="message" className="mb-2.5 block site-txt">
              Message
            </label>
            <input
              type="text"
              name="message"
              defaultValue={state.school.message}
              id="message"
              max={20}
              placeholder="Enter School Message maximum 20 characters"
              className="w-full site-bg site-txt rounded border border-gray-400 dark:border-gray-300 py-3 px-5 outline-none transition focus:border-blue-600 active:border-blue-600 "
            />
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

export default SchoolPage;
