"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteExam = ({ exam_id }: { exam_id: string }) => {
  const [isLoading, setIdLoading] = useState(false);
  const router = useRouter();
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIdLoading(true);
    try {
      const respone = await fetch("/api/publish-result", {
        method: "DELETE",
        body: JSON.stringify({ exam_id }),
      });
      if (respone.ok) {
        router.push("/dashboard/exams");
      } else {
        toast({ title: "Failed to Delete Result", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Failed to Delete Result", variant: "destructive" });
    } finally {
      setIdLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded">
        Delete
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>
          Do you want Delete this exam result?
        </AlertDialogTitle>
        <AlertDialogDescription>
          Once you delete the exam result, it will be remove all data of Exam
          from server.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogAction>Cancel</AlertDialogAction>
          <form onSubmit={submitHandler}>
            <AlertDialogAction type="submit" disabled={isLoading}>
              Continue
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteExam;
