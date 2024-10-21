import React from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const FormModal = ({
  table,
  children,
}: {
  table: string;
  children: React.ReactNode;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add {table}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogTitle className="text-center text-2xl">
          Add New {table}
        </DialogTitle>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default FormModal;
