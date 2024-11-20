"use client";

import { login } from "@/auth";
import { toast } from "@/hooks/use-toast";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import FormInput from "./FormInput";
const SignInForm = () => {
  const router = useRouter();
  const [isLoaing, setIsLoading] = useState(false);

  const handleAction = async (formData: FormData) => {
    setIsLoading(true);
    const { error, redirect } = await login(formData);
    if (redirect) {
      router.push(redirect);
    }
    if (error) {
      toast({ title: "Invalid Credential", variant: "destructive" });
    }
    setIsLoading(false);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-transparent outline-none shadow-none hover:bg-indigo-600 text-white">
          Login
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogTitle className="text-center text-2xl">Sign In Form</DialogTitle>
        <DialogDescription> {}</DialogDescription>
        <form className="w-full" action={handleAction}>
          <div className="p-2">
            <FormInput
              type="texr"
              name="uid"
              width="w-full"
              label="UID"
              required={true}
            />
          </div>
          <div className="p-2">
            <FormInput
              type="password"
              name="password"
              width="w-full"
              label="Password"
              required={true}
            />
          </div>

          <Button disabled={isLoaing} className="p-2 w-full" type="submit">
            {isLoaing ? "Loading..." : "Login"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SignInForm;
