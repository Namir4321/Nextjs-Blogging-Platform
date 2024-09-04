"use client";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useFormStatus } from "react-dom";
export const ButtonProp = ({ variant, btnsize, type, text, className }) => {
  const { pending } = useFormStatus();
  return (
    <>
      <Button
        variant={variant}
        disabled={pending}
        size={btnsize}
        className={className}
        type={type}
      >
        {pending ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : text}
      </Button>
    </>
  );
};
