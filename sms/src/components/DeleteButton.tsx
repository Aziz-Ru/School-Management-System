import { useFormStatus } from "react-dom";

const DeleteButton = () => {
  const { pending } = useFormStatus();

  return (
    <div className="w-1/3 text-center">
      <input
        className="delete-btn px-2 py-1 "
        type="submit"
        aria-disabled={pending}
        value={pending ? "Delete..." : "Delete"}
      />
    </div>
  );
};
export default DeleteButton;
