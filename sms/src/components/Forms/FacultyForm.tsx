import { addFaculty } from "@/actions/faculty";
import toast from "react-hot-toast";
import Formsubmitbtn from "../Formsubmitbtn";
import Input from "./FormInput";

interface FacultyFormProps {
  updateModal: () => void;
}

const FacultyForm: React.FC<FacultyFormProps> = ({ updateModal }) => {
  return (
    <form
      action={async (formdata: FormData) => {
        const res = await addFaculty(formdata);
        if (res.error) {
          toast.error(res.error);
        } else if (res.msg) {
          toast.success(res.msg);
        }
        updateModal();
      }}
      className="bg-transparent"
    >
      <div className="my-2">
        <h2 className="text-center text-2xl font-medium">Add New Faculty</h2>
      </div>

      <div className="mb-2">
        <Input
          type="text"
          label="Faculty Name"
          name="facultyName"
          required={true}
        />
      </div>

      <Formsubmitbtn LoadingTitle="ADDING..." Title="ADD" width="w-full" />
    </form>
  );
};

export default FacultyForm;
