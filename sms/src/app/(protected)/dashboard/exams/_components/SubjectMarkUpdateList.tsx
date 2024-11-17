"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { update_exam_marks } from "@/lib/actions/exam";
const SubjectMarkUpdateList = ({
  exam_subject,
  subject_marks,
}: {
  exam_subject: any;
  subject_marks: any[];
}) => {
  return (
    <form
      action={async (formData) => {
        formData.append("exam_subject_id", exam_subject.id);
        const { error, msg } = await update_exam_marks(formData);
        if (error) {
          toast({ title: error, variant: "destructive" });
        }
        if (msg) {
          toast({ title: msg, variant: "default" });
        }
      }}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{exam_subject?.subject_name}</h2>
        <Button type="submit">Submit</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student ID</TableHead>
            <TableHead>Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subject_marks.map((mark) => (
            <TableRow key={mark.student_id}>
              <TableCell>{mark.student_id}</TableCell>
              <TableCell>
                <input
                  type="number"
                  name={mark.student_id.toString()}
                  defaultValue={mark.obtained_marks}
                  className="input w-20"
                  min={1}
                  max={100}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </form>
  );
};

export default SubjectMarkUpdateList;
