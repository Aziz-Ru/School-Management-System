"use client";

import { login } from "@/auth";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button } from "../ui/button";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";

const SignInForm = () => {
  const router = useRouter();
  const [isLogged, setIsLogged] = useState("");
  return (
    <form
      className="w-[380px] border"
      action={async (formData) => {
        const { error, msg } = await login(formData);
        if (error) {
          setIsLogged(error);
          toast({ title: "Error", description: error });
        } else if (msg) {
          if (formData.get("role") === "ADMIN") {
            router.push("/dashboard");
          } else if (formData.get("role") === "TEACHER") {
            router.push("/teacher");
          } else if (formData.get("role") === "STUDENT") {
            router.push("/student");
          }

          toast({ title: "Logged In", description: "Welcome" });
        }
      }}
    >
      <h1>Sign In</h1>
      {isLogged && <p>{isLogged}</p>}
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
  );
};

export default SignInForm;
