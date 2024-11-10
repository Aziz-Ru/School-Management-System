"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Class, Subject } from "@/utils/types";

import { toast } from "@/hooks/use-toast";
import { useEffect, useRef, useState } from "react";
import { createExam } from "../_action/exam";

const AddExamForm = ({
  classData,
  subjects,
}: {
  classData: Class[];
  subjects: Subject[];
}) => {
  const [classId, setClassId] = useState<Class>();
  const [examSubject, setExamSubject] = useState<Subject[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (classId) {
      setExamSubject([]);
      setDates([]);
      subjects.map((subject) => {
        if (subject.classId == classId.id) {
          setExamSubject((prev: any) => [...prev, subject]);
        }
      });
    }
  }, [classId, classData, subjects]);

  const [dates, setDates] = useState<{ id: string; date: string }[]>([]);

  const handleDateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    setDates((prev) => {
      const filterDates = prev.filter((date) => date.id !== id);
      return [...filterDates, { id, date: e.target.value }];
    });
  };

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        formData.append("dates", JSON.stringify(dates));
        const { error, msg } = await createExam(formData);
        if (error) {
          toast({ title: error });
        } else {
          toast({ title: msg });
          // formRef.current?.reset();
        }
      }}
    >
      <div className="flex gap-4">
        {/* CLASS */}
        <div className="flex flex-col gap-3 mb-4 w-full">
          <Label>Class</Label>
          <Select
            value={classId?.className}
            onValueChange={(e) => {
              setClassId(classData[parseInt(e) - 1]);
            }}
            name={"classId"}
            required={true}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={`Select Class`} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Class</SelectLabel>
                {classData.map((cls) => {
                  return (
                    <SelectItem key={cls.id} value={cls.id.toString()}>
                      {cls.className}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Table className="p-2">
        <TableHeader>
          <TableRow>
            <TableHead>Subject</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* SUBJECT */}
          {examSubject.map((subject, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{subject.courseName}</TableCell>
                <TableCell>
                  <input
                    onChange={(e) => handleDateChange(e, subject.id!)}
                    required={true}
                    name={`subject-${subject.id}`}
                    className="py-1 px-3 bg-transparent border rounded"
                    type="date"
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="py-3 flex justify-between items-center">
        <select name="type" className="px-4 py-2 bg-transparent rounded border">
          <option value="MID">Mid</option>
          <option value="FINAL">Final</option>
        </select>
        <Button>Create</Button>
      </div>
    </form>
  );
};

export default AddExamForm;
