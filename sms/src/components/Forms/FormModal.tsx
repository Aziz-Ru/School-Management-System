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
}: {
  table: string;
  children: React.ReactNode;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-sky-400 hover:bg-sky-300 text-black">
          <Icon name="Plus" size={18} />
          Add {table}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogTitle className="text-center text-2xl">
          Add New {table}
        </DialogTitle>
        <DialogDescription> {}</DialogDescription>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default FormModal;
