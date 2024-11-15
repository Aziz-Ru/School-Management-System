"use client";

import { login } from "@/auth";
import { toast } from "@/hooks/use-toast";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
const SignInForm = () => {
  const router = useRouter();

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
        <form
          className="w-full"
          action={async (formData) => {
            const { error, msg } = await login(formData);
            if (error) {
              toast({ title: "Invalid Credential", variant: "destructive" });
            } else if (msg) {
              if (formData.get("role") === "ADMIN") {
                router.replace("/dashboard");
              } else if (formData.get("role") === "TEACHER") {
                router.replace("/profile");
              } else if (formData.get("role") === "STUDENT") {
                router.replace("/profile");
              }
              toast({ title: "Logged In", description: "Welcome To SMS" });
            }
          }}
        >
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
          <div className="p-2">
            <FormSelect
              name="role"
              label="Role"
              options={["ADMIN", "TEACHER", "STUDENT"]}
            />
          </div>
          <Button className="p-2" type="submit">
            Sign In
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SignInForm;
