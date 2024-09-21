"use client";
import { useFormState } from "react-dom";
import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

const initialState = {
  message: "",
};
const FormContainer = ({ action, children }) => {
  const [state, formAction] = useFormState(action, initialState);
  const { toast } = useToast();
  const formRef = useRef(null);
  useEffect(() => {
    if (state.message) {
      toast({ variant: state.variant, description: state.message });
      if (formRef.current) {
        formRef.current.reset();
      }
    }
  }, [state,toast]);
  return (
    <form action={formAction} ref={formRef}>
      {children}
    </form>
  );
};

export default FormContainer;
