"use client";

import { revalidatePath } from "next/cache";
import { useEffect, useReducer } from "react";

const initialState = {
  classRoom: [],
  loading: false,
  error: "",
  msg: "",
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
        classRoom: action.payload.classRoom,
        msg: action.payload.msg,
      };
    case "FAILURE":
      return {
        ...state,
        error: "Failed",
        loading: false,
      };
    default:
      return state;
  }
};

const Addsection = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchClass = async () => {
      try {
        dispatch({ type: "REQUEST" });
        const res = await fetch("/api/admin/class");
        const data = await res.json();

        dispatch({ type: "SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FAILURE" });
      }
    };
    fetchClass();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData.get("sectionName"));
    console.log(formData.get("classId"));
    console.log(formData.get("year"));
    revalidatePath("/admin/section");
  };

  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit} className="px-2">
        <div className="grid grid-cols-3 sm:flex-row gap-1 sm:gap-2">
          <div className="w-full col-span-3 sm:col-span-1 my-1">
            <input
              type="text"
              name="sectionName"
              placeholder="Section name"
              required
              className="w-full site-bg site-txt rounded border border-gray-400 dark:border-gray-300 py-3 px-5 outline-none transition focus:border-blue-600 active:border-blue-600 "
            />
          </div>
          <div className="w-full col-span-3 sm:col-span-1 flex  my-1">
            <select
              name="classId"
              className="w-1/2 mx-1 site-bg site-txt rounded border border-gray-400 dark:border-gray-300 py-3.5 px-5 outline-none transition focus:border-blue-600 active:border-blue-600"
            >
              {state.classRoom.map((classroom) => {
                return (
                  <option key={classroom.classId} value={classroom.classId}>
                    {classroom.className}
                  </option>
                );
              })}
            </select>
            <select
              name="year"
              className="w-1/2 site-bg site-txt rounded border border-gray-400 dark:border-gray-300 py-3.5 px-5 outline-none transition focus:border-blue-600 active:border-blue-600"
            >
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
              <option value="2030">2030</option>
            </select>
          </div>
          <div className="w-full col-span-3 sm:col-span-1 my-1">
            <input
              type="submit"
              value="Add Section"
              className="w-full site-txt bg-blue-600 text-white rounded py-3 px-5 hover:bg-blue-700 transition"
            />
          </div>
        </div>
      </form>
      <p>{state.error || state.message}</p>
    </div>
  );
};

export default Addsection;
