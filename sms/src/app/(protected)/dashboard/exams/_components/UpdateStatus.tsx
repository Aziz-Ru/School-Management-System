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

const UpdateStatus = ({ exam_id }: { exam_id: string }) => {
  const [isLoading, setIdLoading] = useState(false);
  const router = useRouter();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIdLoading(true);
    try {
      const respone = await fetch("/api/publish-result", {
        method: "PUT",
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
      <AlertDialogTrigger className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded">
        DRAFT
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>
          Do you want Update this exam Status?
        </AlertDialogTitle>
        <AlertDialogDescription>
          This Action will update the status of the exam.
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

export default UpdateStatus;
