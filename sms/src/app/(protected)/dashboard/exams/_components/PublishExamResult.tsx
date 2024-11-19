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

const PublishExamResult = ({
  data,
  exam_id,
}: {
  exam_id: string;
  data: string;
}) => {
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/publish-result", {
        method: "POST",
        body: JSON.stringify({ exam_id, data }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (result.error) {
        toast({ title: result.error, variant: "destructive" });
      }
      if (result.msg) {
        toast({ title: result.msg });
      }
    } catch (error) {
      toast({ title: "Failed to Publish Result", variant: "destructive" });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded">
        Publish Result
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>
          Do you want publish this exam result?
        </AlertDialogTitle>

        <AlertDialogDescription>
          Once you publish the exam result, it will be visible to students.
        </AlertDialogDescription>

        <AlertDialogFooter>
          <AlertDialogAction>Cancel</AlertDialogAction>
          <form onSubmit={submitHandler}>
            <AlertDialogAction type="submit">Continue</AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PublishExamResult;
