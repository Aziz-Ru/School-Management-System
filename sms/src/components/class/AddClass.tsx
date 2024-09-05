import { addClass } from "@/actions/class";

const AddClass = () => {
  return (
    <div>
      <form action={addClass}>
        <div className="px-4">
          <input
            className="w-full site-bg site-txt bg-blue-700 hover:bg-blue-500 rounded py-3 px-5 outline-none transition"
            type="submit"
            value={"Add Class 1-12"}
          />
        </div>
      </form>
    </div>
  );
};

export default AddClass;
