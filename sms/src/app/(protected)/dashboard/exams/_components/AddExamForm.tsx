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
import { useEffect, useState } from "react";
import { createExam } from "../_action/exam";

const AddExamForm = ({
  classData,
  subjects,
}: {
  classData: Class[];
  subjects: Subject[];
}) => {
  const [selectedClass, setSelectedClass] = useState<Class>();
  const [selectedSection, setSelectedSection] = useState("");
  const [examSubject, setExamSubject] = useState<Subject[]>([]);

  useEffect(() => {
    if (selectedClass) {
      subjects.map((subject) => {
        if (subject.classId == selectedClass.id) {
          setExamSubject((prev: any) => [...prev, subject]);
        }
      });
    }
  }, [selectedClass, classData, subjects]);

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
      action={async (formData) => {
        formData.append("dates", JSON.stringify(dates));
        const { error, msg } = await createExam(formData);
        if (error) {
          toast({ title: error });
        } else {
          toast({ title: msg });
        }
      }}
    >
      <div className="flex gap-4">
        {/* CLASS */}
        <div className="flex flex-col gap-3 mb-4 w-full">
          <Label>Class</Label>
          <Select
            value={selectedClass?.className}
            onValueChange={(e) => {
              setSelectedClass(classData[parseInt(e) - 1]);
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
      <Table>
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
      <Button>Create</Button>
    </form>
  );
};

export default AddExamForm;
