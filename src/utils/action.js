'use server'
import { auth } from "@/auth";
import db from "@/utils/db";
import { imageSchema, validateWithZodSchema } from "./FormValidation";
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
      username:true
    },
  });
   return profile || null;
};

export const BlogImageAction = async (prevState, formData) => {
  console.log("clicked")
  const image = formData.get("image");
  console.log(image)
  const validateFields = await validateWithZodSchema(imageSchema, { image });
};