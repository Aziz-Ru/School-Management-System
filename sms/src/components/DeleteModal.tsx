"use client";

import { deleteSectionAction } from "@/actions/section";
import { deleteCourseAction } from "@/components/features/classes/actions/course";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";

interface DeleteFormProps {
  table: "teacher" | "student" | "class" | "course" | "section";
  id: number | string;
  name: string;
}

const DeleteModal: React.FC<DeleteFormProps> = ({ name, id, table }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="bg-red-600 px-4 py-2 rounded shadow text-white">
        Delete
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{`Do You Want to Delete ${name} ${table}?`}</AlertDialogTitle>
          <AlertDialogDescription>{`This ${name} ${table} will be remove from  this table`}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {table == "teacher"
            ? deleteTeacherForm(id)
            : table == "course"
            ? deleteCourseForm(id)
            : table == "student"
            ? deleteStudentForm(id)
            : table == "class"
            ? deleteClassForm(id)
            : table == "section"
            ? deleteSectionForm(id)
            : ""}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const deleteTeacherForm = (id: string | number) => {
  return (
    <form action={async (formData: FormData) => {}}>
      <AlertDialogAction type="submit">Continue</AlertDialogAction>
    </form>
  );
};

const deleteStudentForm = (id: string | number) => {
  return (
    <form action={async (formData: FormData) => {}}>
      <AlertDialogAction type="submit">Continue</AlertDialogAction>
    </form>
  );
};

const deleteClassForm = (id: string | number) => {
  return (
    <form action={async (formData: FormData) => {}}>
      <AlertDialogAction type="submit">Continue</AlertDialogAction>
    </form>
  );
};

const deleteCourseForm = (id: string | number) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pending } = useFormStatus();
  return (
    <form
      action={async (formData: FormData) => {
        const { error, msg } = await deleteCourseAction(id as string);
        if (error) {
          toast.error(error);
        } else if (msg) {
          toast.success(msg);
        }
      }}
    >
      <AlertDialogAction type="submit" disabled={pending}>
        Continue
      </AlertDialogAction>
    </form>
  );
};

const deleteSectionForm = (id: string | number) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pending } = useFormStatus();
  return (
    <form
      action={async (formData: FormData) => {
        const { error, msg } = await deleteSectionAction(id as string);
        if (error) {
          toast.error(error);
        } else if (msg) {
          toast.success(msg);
        }
      }}
    >
      <AlertDialogAction type="submit">Continue</AlertDialogAction>
    </form>
  );
};

export default DeleteModal;
