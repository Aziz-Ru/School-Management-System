"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { add_routine_action } from "@/lib/actions/routin";
import { DaysOfWeek } from "@/lib/data";
import { SectionSubject, Timeslot } from "@/lib/types";
import { useState } from "react";

const AddRoutine = ({
  subjects,
  section_id,
  time_slots,
}: {
  section_id: string;
  subjects: SectionSubject[];
  time_slots: Timeslot[];
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [filteredTimeSlots, setFilteredTimeSlots] = useState<Timeslot[]>([]);

  const onChangeDay = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const day = e.target.value;

    const filterTimeSlots = time_slots.filter((time_slot) => {
      return time_slot.day === day.toUpperCase();
    });

    setFilteredTimeSlots(
      filterTimeSlots.sort((a, b) => (a.hour < b.hour ? -1 : 1))
    );
  };

  const handleAction = async (formData: FormData) => {
    setIsLoading(true);
    formData.append("section_id", section_id);
    const teacher_id = subjects.find(
      (s) => s.subject_name === formData.get("subject_name")
    )?.teacher_id!;
    formData.append("teacher_id", teacher_id.toString());
    const { msg, error } = await add_routine_action(formData);
    if (error) {
      toast({ title: error, variant: "destructive" });
    }
    if (msg) {
      toast({ title: msg });
    }
    setIsLoading(false);
  };

  return (
    <div className="">
      <div className="max-w-screen-xl">
        <h1 className="text-2xl font-bold text-start">Manage Schedule</h1>
        <div className="mt-2 w-full ">
          <form
            action={handleAction}
            className="flex flex-col w-full gap-3 px-3"
          >
            <div className="flex gap-3">
              <div className="flex flex-col gap-3 mb-4 w-1/2">
                <Label>Subject</Label>
                <select className="input" name="subject_name">
                  {subjects.map((subject, index) => {
                    return (
                      <option
                        className="text-gray-800"
                        key={index}
                        value={subject.subject_name!}
                      >
                        {subject.subject_name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="flex flex-col gap-3 mb-4 w-1/2">
                <Label>Day</Label>
                <select onChange={onChangeDay} className="input" name="day">
                  <option className="text-gray-800" value="#">
                    Day
                  </option>
                  {DaysOfWeek.map((day, index) => {
                    return (
                      <option className="text-gray-800" key={index} value={day}>
                        {day}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="flex flex-col gap-3 mb-4 w-1/2">
                <Label>Hour</Label>
                <select className="input" name="timeslot_id">
                  <option value="#">Hour</option>
                  {filteredTimeSlots.map((time_slot, index) => {
                    return (
                      <option
                        className="text-gray-800"
                        key={index}
                        value={time_slot.id}
                      >
                        {time_slot.hour}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <Button disabled={isLoading} type="submit">
              {isLoading ? "Loading..." : "Add"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRoutine;
