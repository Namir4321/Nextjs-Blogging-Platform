"use client";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const initialState = {
  message: "",
};
const FormContainer = ({ action, children }) => {
  const [state, formAction] = useFormState(action, initialState);
  const { toast } = useToast();
  useEffect(() => {
    if (state.message) {
      toast({variant: state.variant, description: state.message });
    }
  }, [state]);
  return <form action={formAction}>{children}</form>;
};

export default FormContainer;
