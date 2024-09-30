import FormInput from "@/components/form/FormInput";
import React from "react";
import { ButtonProp } from "../form/ButtonProp";
import FormContainer from "../form/FormContainer";
import { handleSignUpAction } from "@/lib/Authaction";

const EmailProvider = () => {
  return (
    <div className="gap-4 grid  items-center">
      <FormContainer action={handleSignUpAction}>
        <div className="grid md:grid-cols-1 gap-2 ">
          <FormInput
            label="First Name"
            name="firstName"
            type="text"
            className="bg-slate-50 dark:bg-muted border-none shadow-none"
          />
          <FormInput
            label="Last Name"
            name="lastName"
            type="text"
            className="bg-slate-50 dark:bg-muted border-none shadow-none"
          />
          <FormInput
            label="Email"
            name="email"
            type="email"
            className="bg-slate-50 dark:bg-muted w-full border-none shadow-none"
          />
          <FormInput
            label="Password"
            name="password"
            type="password"
            className="bg-slate-50 dark:bg-muted border-none shadow-none"
          />
          <FormInput
            label="Confirm Password"
            name="confirmpassword"
            placeholder="Confirm Password"
            type="password"
            className="bg-slate-50 dark:bg-muted border-none shadow-none"
          />
        </div>
        <ButtonProp
          className="mt-4 w-full rounded-full"
          text="Sign Up"
          variant="default"
          btnsize="lg"
          type="submit"
        />
      </FormContainer>
    </div>
  );
};

export default EmailProvider;
