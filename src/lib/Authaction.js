"use server";
import {
  logInSchema,
  signUpSchema,
  validateWithZodSchema,
} from "@/utils/FormValidation";
import { redirect } from "next/navigation";
import axios from "axios";
import { signIn, signOut } from "@/auth";
import db from "@/utils/db";
import { generateFromEmail } from "unique-username-generator";
import { AuthError } from "next-auth";
export const generateUsername = async (email) => {
  const username = generateFromEmail(email, 3);
  return `@${username}`;
};
export const handleLogout = async () => {
  await signOut();
};

export const findUserByEmail = async (email) => {
  if (!email) return null
  const user = await db.profile.findUnique({
    where: { email },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      username: true,
      email: true,
      profileImage: true,
      password:true
    },
  });

  return user;
};
export const handleSignInAction = async (prevState, formData) => {
  const rawData = Object.fromEntries(formData);
  const validateFields = await validateWithZodSchema(logInSchema, rawData);
  try {
    await signIn("credentials", {
      email: validateFields.email,
      password: validateFields.password,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { message: "Invalid Credentials!", redirect: "/signin" };
        case "AccessDenied":
          return {
            message: "Email not found. Please sign up to create an account!",
            redirect: "/signin",
          };
        default:
          return { message: "Something went wrong" };
      }
    }
  }
  redirect("/");
};
export const handleSignUpAction = async (prevState, formData) => {
  try {
    const rawData = Object.fromEntries(formData);
    const validateFields = await validateWithZodSchema(signUpSchema, rawData);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_PRODUCTION_WEBSITE_URL}/api/auth/register`,
      validateFields
    );
  } catch (error) {
    if (error.response.status === 500) {
      return {
        variant: "destructive",
        message: error.response.data.message,
      };
    }
    return {
      variant: "destructive",
      message: error.message,
    };
  }
  redirect("/");
};
