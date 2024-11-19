"use client";
import { toast } from "@/hooks/use-toast";
import { addRoomAction } from "@/lib/actions/room";
import { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

const AddRoomForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const handleAction = async (formData: FormData) => {
    setIsLoading(true);
    const { msg, error } = await addRoomAction(formData);
    if (msg) {
      toast({ title: msg });
    } else if (error) {
      toast({ title: error });
    }
    setIsLoading(false);
  };

  return (
    <form action={handleAction}>
      <h1 className="font-bold text-xl mb-4">Add Class Room</h1>
      <div className="mb-4 w-full">
        <div className="flex items-center w-full gap-2 mb-4">
          <div className="flex w-1/2 flex-col gap-3">
            <Label>Room Number</Label>
            <input
              className="input"
              type="number"
              min={0}
              name="room_number"
              placeholder="Enter Room Number"
            />
          </div>
          <div className="flex w-1/2 flex-col gap-3">
            <Label>Floor</Label>
            <input
              className="input"
              type="number"
              min={0}
              name="floor"
              placeholder="Enter Floor Number"
            />
          </div>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <div className="flex w-1/3 flex-col gap-3 ">
            <Label>Building Name</Label>
            <select className="input" name="building_name">
              <option className="text-gray-800" value="ACADEMIC BUILDING 1">
                ACADEMIC BUILDING 1
              </option>
              <option className="text-gray-800" value="ACADEMIC BUILDING 2">
                ACADEMIC BUILDING 1
              </option>
              <option className="text-gray-800" value="ACADEMIC BUILDING 3">
                ACADEMIC BUILDING 1
              </option>
            </select>
          </div>
          <div className="w-1/3 flex flex-col gap-3 ">
            <Label>Room Type</Label>
            <select name="type" className="input">
              <option value="#">Type</option>
              <option className="text-gray-800" value={"CLASSROOM"}>
                CLASSROOM
              </option>
              <option className="text-gray-800" value={"LABORATORY"}>
                LABORATORY
              </option>
              <option className="text-gray-800" value={"COMPUTER_LAB"}>
                COMPUTER_LAB
              </option>
              <option className="text-gray-800" value={"LIBRARY"}>
                LIBRARY
              </option>
              <option className="text-gray-800" value={"OFFICE"}>
                OFFICE
              </option>
            </select>
          </div>
          <div className="flex flex-col gap-3 w-1/3 ">
            <Label>Capacity</Label>
            <input
              className="input"
              type="number"
              min={0}
              name="capacity"
              placeholder="Enter Capacity"
            />
          </div>
        </div>
      </div>
      <Button disabled={isLoading} type="submit">
        {isLoading ? "Loading..." : "Add Room"}
      </Button>
    </form>
  );
};

export default AddRoomForm;
