import FormInput from "@/components/form/FormInput";
import React from "react";
import { ButtonProp } from "@/components/form/ButtonProp";
import FormContainer from "@/components/form/FormContainer";
import { handleSignInAction } from "@/lib/Authaction";

const EmailProvider = () => {
  return (
    <div className="grid ">
      <FormContainer action={handleSignInAction}>
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
          className="bg-slate-50 dark:bg-muted w-full border-none shadow-none"
        />
        <div className="flex flex-col items-center">
          <ButtonProp
            className="mt-4 max-w-[100px]  rounded-full border-none shadow-none"
            text="Sign In"
            variant="default"
            btnsize="lg"
            type="submit"
          />
        </div>
      </FormContainer>
    </div>
  );
};

export default EmailProvider;
