"use server";
import { auth } from "@/auth";
import db from "@/utils/db";
import {
  BlogSchema,
  imageSchema,
  validateWithZodSchema,
} from "./FormValidation";
import { get } from "http";
import { profile } from "console";
import { redirect } from "next/navigation";
export const getAuthUser = async () => {
  const session = await auth();
  if (!session) return null;
  const UserId = session.user.id;
  return UserId;
};
export const getProfileImage = async () => {
  const userId = await getAuthUser();
  if (!userId) return null;
  const profile = await db.profile.findUnique({
    where: { id: userId },
    select: {
      firstName: true,
      lastName: true,
      email: true,
      profileImage: true,
      username: true,
    },
  });
  return profile || null;
};

export const BlogImageAction = async (prevState, formData) => {
  console.log("clicked");
  const image = formData.get("image");
  console.log(image);
  const validateFields = await validateWithZodSchema(imageSchema, { image });
};
export const createBlogAction = async (data) => {
  const user = await getAuthUser();
  const UserId = user;
  try {
    const validateFields = await validateWithZodSchema(BlogSchema, data);

    const res = await db.blog.create({
      data: {
        ...validateFields,
        profileId: UserId,
      },
    });
  } catch (err) {
    console.log(err);
    return { message: err.message };
  }
  // return {message:"Bog Created"}
  redirect("/")
};
