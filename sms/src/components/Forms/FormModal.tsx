import React from "react";
import Icon from "../LucidIcon";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const FormModal = ({
  table,
  children,
  type = "Add",
}: {
  table: string;
  type?: "Add" | "Edit";
  children: React.ReactNode;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-indigo-600 hover:bg-indigo-500 text-white">
          {type === "Add" ? (
            <Icon name="Plus" size={18} />
          ) : (
            <Icon name="Edit" size={18} />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogTitle className="text-center text-2xl">
          {type} {table}
        </DialogTitle>
        <DialogDescription></DialogDescription>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default FormModal;
