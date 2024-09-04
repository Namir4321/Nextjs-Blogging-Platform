import * as z from "zod";
import { ZodSchema } from "zod";

export const validateWithZodSchema = async (schema, data) => {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.errors.map((error) => error.message);
    throw new Error(errors.join(", "));
  }
  return result.data
};

export const logInSchema = z.object({
  email: z
    .string()
    .min(2, { message: "it's a required field" })
    .email({ message: "This is not a valid email" }),
  password: z
    .string()
    .min(1, { message: "Password must be atleast 6 character" }),
});
export const signUpSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "First Name must be atleast 2 character" }),
    lastName: z
      .string()
      .min(2, { message: "Last Name must be atleast 2 character" }),
    email: z
      .string()
      .min(2, { message: "it's a required field" })
      .email({ message: "This is not a valid email" }),
    password: z
      .string()
      .min(6, { message: "Password must be atleast 6 character" }),
    confirmpassword: z
      .string()
      .min(6, { message: "Password must be atleast 6 character" }),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
