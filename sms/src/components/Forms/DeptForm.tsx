import { addDept } from "@/actions/dept";
import toast from "react-hot-toast";
import Formsubmitbtn from "../Formsubmitbtn";
import Input from "../Input";

interface DeptFormProps {
  updateModal: () => void;
  data: any[];
}

const DeptForm: React.FC<DeptFormProps> = ({ updateModal, data }) => {
  console.log(data);
  return (
    <form
      action={async () => {
        const { error, msg } = await addDept(new FormData(document.forms[0]));
        if (error) {
          toast.error(error);
        } else if (msg) {
          toast.success(msg);
          updateModal();
        }
      }}
      className="bg-transparent"
    >
      <div className="my-2">
        <h2 className="text-center text-2xl font-medium">Add New Department</h2>
      </div>
      <div className="mb-2">
        <Input
          type="text"
          label="Department Name"
          name="deptName"
          required={true}
        />
      </div>
      <div className="mb-2">
        <select
          className="w-full p-2 border border-gray-300 bg-transparent rounded-md"
          name="facultyId"
        >
          {data.map((item) => {
            return (
              <option className="text-black" key={item.id} value={item.id}>
                {item.facultyName}
              </option>
            );
          })}
        </select>
      </div>
      <Formsubmitbtn LoadingTitle="ADDING..." Title="ADD" width="w-full" />
    </form>
  );
};

export default DeptForm;
