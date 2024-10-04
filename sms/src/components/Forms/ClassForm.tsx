import {
  addAllClass,
  addCollege,
  addPrimary,
  addSchool,
} from "@/actions/class";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface ClassFormProps {
  updateModal: () => void;
}

const ClassForm: React.FC<ClassFormProps> = ({ updateModal }) => {
  const [nums, setNums] = useState({ primary: 0, school: 0, college: 0 });
  useEffect(() => {
    const getCount = async () => {
      try {
        const response = await fetch("/api/list/class?count=true");
        const { primary, school, college } = await response.json();
        setNums({ primary, school, college });
      } catch (error) {
        toast.error("Failed to fetch");
      }
    };
    getCount();
  }, []);

  return (
    <div>
      <h1 className="text-xl text-center font-semibold mb-2">Add Class</h1>
      <div className="flex flex-col items-center ">
        {nums.college == 0 && nums.primary == 0 && nums.school == 0 ? (
          <form
            className="hover:bg-gray-800 w-full flex items-center justify-center border border-gray-800"
            action={async () => {
              const { error, msg } = await addAllClass();
              if (msg) {
                toast.success(msg);
              } else if (error) {
                toast.error(error);
              }
              updateModal();
            }}
          >
            <input
              className="p-2 w-full "
              type="submit"
              value="Primary to College"
            />
          </form>
        ) : (
          ""
        )}
        {nums.primary == 0 ? (
          <form
            className="hover:bg-gray-800 w-full flex items-center justify-center border border-gray-800"
            action={async () => {
              const { error, msg } = await addPrimary();
              if (msg) {
                toast.success(msg);
              } else if (error) {
                toast.error(error);
              }
              updateModal();
            }}
          >
            <input className="p-2 w-full " type="submit" value="Primary" />
          </form>
        ) : (
          ""
        )}

        {nums.school == 0 ? (
          <form
            className="hover:bg-gray-800 w-full flex items-center justify-center border border-gray-800"
            action={async () => {
              const { error, msg } = await addSchool();
              if (msg) {
                toast.success(msg);
              } else if (error) {
                toast.error(error);
              }
              updateModal();
            }}
          >
            <input className="p-2 w-full " type="submit" value="School" />
          </form>
        ) : (
          ""
        )}
        {nums.college == 0 ? (
          <form
            className="hover:bg-gray-800 w-full flex items-center justify-center border border-gray-800"
            action={async () => {
              const { error, msg } = await addCollege();
              if (msg) {
                toast.success(msg);
              } else if (error) {
                toast.error(error);
              }
              updateModal();
            }}
          >
            <input className="p-2 w-full " type="submit" value="College" />
          </form>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ClassForm;