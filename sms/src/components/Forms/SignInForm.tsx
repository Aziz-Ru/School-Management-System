"use client";

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

  const handleAction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          uid: formData.get("uid"),
          password: formData.get("password"),
        }),
      });
      const result = await response.json();

      if (response.ok) {
        if (result.role == "ADMIN") {
          router.replace("/dashboard");
        } else {
          router.replace("/profile");
        }
      }
      if (result.error) {
        toast({ title: "Invalid Credential", variant: "destructive" });
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
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
        <form className="w-full" onSubmit={handleAction}>
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
