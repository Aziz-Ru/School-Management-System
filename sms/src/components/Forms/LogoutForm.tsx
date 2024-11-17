"use client";
import { logout } from "@/auth";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import Icon from "../LucidIcon";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
} from "../ui/alert-dialog";
const LogoutForm = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="text-lg flex justify-center items-center lg:justify-start gap-2 py-2 md:px-2 rounded-md hover:bg-blue-600 text-gray-900 hover:text-white w-full">
        <Icon name="LogOut" size={18} className="text-black hover:text-white" />
        <span className=" hidden lg:block">Logout</span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
        <AlertDialogFooter>
          <AlertDialogAction>Cancel</AlertDialogAction>
          <form
            action={async () => {
              await logout();
            }}
          >
            <AlertDialogAction type="submit">Continue</AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutForm;
