"use client";
import { useFormStatus } from "react-dom";

const Formsubmitbtn = ({
  Title,
  LoadingTitle,
  width = "w-full",
}: {
  Title: string;
  LoadingTitle: string;
  width: string;
}) => {
  const { pending } = useFormStatus();
  return (
    <div className={`my-2 ${width}`}>
      <input
        className="link-btn px-2 py-3 my-1 w-full"
        type="submit"
        aria-disabled={pending}
        value={pending ? LoadingTitle : Title}
      />
    </div>
  );
};

export default Formsubmitbtn;
