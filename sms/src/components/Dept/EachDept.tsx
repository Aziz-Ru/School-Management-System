"use client";
import { deleteDept, getDept } from "@/actions/dept";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DeleteButton from "../DeleteButton";

interface Props {
  id: string;
  deptName: string;
}
const EachDept = ({ initialDept }: { initialDept: Props[] }) => {
  const [depts, setDepts] = useState<Props[]>([]);
  useEffect(() => {
    setDepts(initialDept);
  }, [initialDept]);

  return (
    <div className="relative">
      {/* start filtering */}
      <div className="w-full mb-2">
        <form
          action={async (formData) => {
            const res = await getDept(formData);
            setDepts(res);
          }}
          className="w-full flex justify-around gap-2"
        >
          <input
            className="w-2/3 site-bg site-txt rounded border border-gray-400 dark:border-gray-300 py-3 px-5 outline-none transition focus:border-blue-600 active:border-blue-600"
            type="text"
            name="deptName"
            placeholder="Search Department"
          />
          <input
            type="submit"
            value="Search"
            className="w-1/3 shadow px-2 text-white py-2.5 bg-blue-700 hover:bg-blue-600  rounded"
          />
        </form>
      </div>
      {/* end filtering */}
      {/* start depts */}
      <div className="">
        {depts.map((dept) => {
          return (
            <div
              key={dept.id}
              className="flex items-center justify-around gap-2 px-4 py-1 border border-gray-200 dark:border-gray-600 site-hover"
            >
              <form
                action={async () => {
                  const { error, success } = await deleteDept(dept.id);
                  if (success) {
                    toast.success(success);
                  } else {
                    toast.error(error);
                  }
                }}
                className="flex w-full  items-center"
              >
                <div className="w-1/3 text-start">
                  <span>{dept.deptName}</span>
                </div>
                <div className="w-1/3 text-center">
                  <Link
                    href={`/admin/ds/d/${dept.id}`}
                    className="link-btn px-2 py-1"
                  >
                    Visit
                  </Link>
                </div>
                <DeleteButton />
              </form>
            </div>
          );
        })}
      </div>
      {/* end depts */}
    </div>
  );
};

export default EachDept;
