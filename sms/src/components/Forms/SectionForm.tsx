import { addSection } from "@/actions/section";
import toast from "react-hot-toast";
import Formsubmitbtn from "../Formsubmitbtn";
import Input from "../Input";

interface SectionFormProps {
  updateModal: () => void;
  data: any;
}

export const AddSectionForm: React.FC<SectionFormProps> = ({ updateModal, data }) => {
  return (
    <div>
      <h1 className="text-xl text-center font-semibold mb-2">
        Add New Section
      </h1>

      <form
        action={async (formData) => {
          const { error, msg } = await addSection({ formData });
          if (error) {
            toast.error(error);
          } else if (msg) {
            toast.success(msg);
            updateModal();
          }
        }}
      >
        <Input
          label="Section Name"
          name="sectionName"
          type="text"
          required={true}
        />
        <input
          type="number"
          name="id"
          className="hidden"
          defaultValue={data.id}
        />

        <Formsubmitbtn width="w-full" Title="Add" LoadingTitle="Adding..." />
      </form>
    </div>
  );
};

