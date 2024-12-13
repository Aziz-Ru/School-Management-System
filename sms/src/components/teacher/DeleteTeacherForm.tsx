"use client";
import DeleteModal from "../Forms/DeleteModal";
import { AlertDialogAction } from "../ui/alert-dialog";

const DeleteTeacherForm = () => {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <DeleteModal>
      <form onSubmit={onSubmit}>
        <AlertDialogAction>Delete</AlertDialogAction>
      </form>
    </DeleteModal>
  );
};

export default DeleteTeacherForm;
