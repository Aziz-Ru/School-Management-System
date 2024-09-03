"use client";
import { useFormStatus } from "react-dom";

const Formsubmitbtn = ({
  Title,
  LoadingTitle,
}: {
  Title: string;
  LoadingTitle: string;
}) => {
  const { pending } = useFormStatus();
  return (
    <div className="my-2 w-full">
      <input
        className="shadow px-2 text-white w-full py-2.5 bg-blue-700 hover:bg-blue-600  rounded"
        type="submit"
        aria-disabled={pending}
        value={pending ? LoadingTitle : Title}
      />
    </div>
  );
};

export default Formsubmitbtn;
