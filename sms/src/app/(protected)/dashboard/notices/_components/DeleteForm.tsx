"use client";
import DeleteModal from "@/components/Forms/DeleteModal";
import { AlertDialogAction } from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const DeleteForm = ({ id }: { id: string }) => {
  const router = useRouter();
  const onDelete = async () => {
    const response = await fetch(`/api/notices?id=${id}`, {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    if (response.ok) {
      router.push("/dashboard/notices");
    } else {
      toast({ title: "Failed to delete Notice", variant: "destructive" });
    }
  };
  return (
    <DeleteModal>
      <AlertDialogAction onClick={onDelete}>Continue</AlertDialogAction>
    </DeleteModal>
  );
};

export default DeleteForm;
