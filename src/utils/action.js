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
import { comment } from "postcss";
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
export const totalBlogAction = async (tagsearch) => {
  try {
    const whereClause = { draft: false };
    if (tagsearch !== "home") {
      whereClause.Tag = { has: tagsearch };
    }
    console.log(whereClause);
    const totalData = await db.blog.count({
      where: whereClause,
    });
    console.log(totalData)
    return totalData;
  } catch (err) {
    return { message: err.message };
  }
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
  redirect("/");
};
export const fetchBlogAction = async (page) => {
  try {
    const pagenum = page > 1 ? (page - 1) * 1 : 0;
    console.log(pagenum);
    const blogs = await db.blog.findMany({
      take: 5,
      skip: pagenum,
      select: {
        id: true,
        title: true,
        banner: true,
        description: true,
        content: true,
        createdAt: true,
        Tag: true,
        profile: {
          select: {
            firstName: true,
            lastName: true,
            profileImage: true,
            username: true,
            id: true,
          },
        },
      },
    });
    return blogs;
  } catch (err) {
    console.log(err);
    return { message: err.message };
  }
};
export const fetchtrendingBlogAction = async () => {
  try {
    const trending = await db.blog.findMany({
      orderBy: [
        { like_count: "desc" },
        { comment_count: "desc" },
        { read_count: "desc" },
      ],
      take: 5,
      select: {
        id: true,
        title: true,
        createdAt: true,
        profile: {
          select: {
            firstName: true,
            lastName: true,
            profileImage: true,
            username: true,
            id: true,
          },
        },
      },
    });
    return trending;
  } catch (err) {
    return { message: err.message };
  }
};

export const fetchBlogWithFilterAction = async (tagsearch) => {
  try {
    const filterBlog = await db.blog.findMany({
      where: { Tag: { has: tagsearch } },
      select: {
        id: true,
        title: true,
        banner: true,
        description: true,
        content: true,
        createdAt: true,
        Tag: true,
        profile: {
          select: {
            firstName: true,
            lastName: true,
            profileImage: true,
            username: true,
            id: true,
          },
        },
      },
    });
    return filterBlog;
  } catch (err) {
    return { message: err.message };
  }
};
