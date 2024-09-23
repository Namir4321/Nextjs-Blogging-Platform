"use server";
import { auth } from "@/auth";
import db from "@/utils/db";
import {
  BlogSchema,
  commentSchema,
  imageSchema,
  validateWithZodSchema,
} from "./FormValidation";
import { get } from "http";
import { profile } from "console";
import { redirect } from "next/navigation";
import { comment } from "postcss";
import github from "next-auth/providers/github";
import { revalidatePath } from "next/cache";
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
    console.log(totalData);
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
export const fetchBlogAction = async () => {
  try {
    const blogs = await db.blog.findMany({
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

export const fetchBlogWithFilterAction = async (tagsearch, search) => {
  try {
    const filterBlog = await db.blog.findMany({
      where: {
        OR: [
          { Tag: { has: tagsearch } },
          { title: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      },
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
export const fetchUserAction = async (username) => {
  try {
    const fetchUser = await db.profile.findMany({
      where: {
        username: {
          contains: username,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        profileImage: true,
      },
    });
    return fetchUser;
  } catch (err) {
    return { message: err.message };
  }
};

export const fetchProfile = async (username) => {
  try {
    const profile = await db.profile.findUnique({
      where: { username },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        createdAt: true,
        profileImage: true,
        bio: true,
        Social_Links: {
          select: {
            youtube: true,
            instagram: true,
            facebook: true,
            twitter: true,
            github: true,
            website: true,
          },
        },
        Blog: {
          select: {
            id: true,
            title: true,
            description: true,
            like_count: true,
            read_count: true,
          },
        },
      },
    });
    return profile;
  } catch (err) {
    console.log(err);
  }
};
export const getBlogfromUserId = async (userId) => {
  try {
    console.log(userId);
    const blogs = await db.blog.findMany({
      where: {
        profileId: userId,
      },
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
  } catch (err) {}
};
export const getProfileFromUserId = async (userId) => {
  try {
    const profile = await db.profile.findUnique({
      where: {
        id: userId,
      },
      select: {
        firstName: true,
        lastName: true,
        profileImage: true,
        username: true,
        id: true,
      },
    });
    return profile;
  } catch (err) {
    return { message: err.message };
  }
};
export const updateReadCount = async (blogId) => {
  try {
    const userId = await getAuthUser();
    const blog = await db.blog.update({
      where: { id: blogId },
      data: { read_count: { increment: 1 } },
      select: { profileId: true },
    });
    if (blog.profileId !== userId) {
      await db.profile.update({
        where: { id: blog.profileId },
        data: { totalread: { increment: 1 } },
      });
    }
  } catch (err) {
    return { message: err.message };
  }
};
export const fetchSingleBlogPost = async (blogId) => {
  try {
    const blog = await db.blog.findUnique({
      where: { id: blogId },
      select: {
        id: true,
        title: true,
        banner: true,
        description: true,
        content: true,
        createdAt: true,
        like_count: true,
        comment_count: true,
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
    return blog;
  } catch (err) {
    console.log(err);
  }
};
export const fetchSimillarBlog = async (
  tagsearch,
  title,
  description,
  blogId
) => {
  try {
    const filterBlog = await db.blog.findMany({
      take: 2,
      where: {
        AND: [
          {
            id: { not: blogId },
          },
          {
            OR: [
              { Tag: { has: tagsearch[0] } },
              { title: { contains: title, mode: "insensitive" } },
              {
                description: {
                  contains: description,
                  mode: "insensitive",
                },
              },
            ],
          },
        ],
      },
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
export const EditBlogAction = async (data, Blog) => {
  try {
    const UserId = await getAuthUser();
    await db.blog.update({
      where: {
        id: Blog,
        profileId: UserId,
      },
      data: {
        banner: data.banner,
        content: data.content,
        description: data.description,
        Tag: data.Tag,
        title: data.title,
      },
    });
  } catch (err) {
    console.log(err);
    return { message: err.message };
  }
  redirect("/");
};
export const fetchFavouriteId = async ({ blogId }) => {
  const userId = await getAuthUser();
  const favourite = await db.favourite.findFirst({
    where: {
      blogId,
      profileId: userId,
    },
    select: {
      id: true,
    },
  });
  return favourite?.id || null;
};
export const toggleFavouriteAction = async ({
  blogId,
  favouriteId,
  pathname,
}) => {
  const user = await getAuthUser();
  try {
    if (favouriteId) {
      await db.favourite.delete({
        where: { id: favouriteId },
      });
      await db.blog.update({
        where: { id: blogId },
        data: { like_count: { increment: -1 } },
      });
    } else {
      await db.favourite.create({
        data: {
          blogId,
          profileId: user,
        },
      });
      await db.blog.update({
        where: { id: blogId },
        data: { like_count: { increment: 1 } },
      });
    }
    revalidatePath(pathname);
    return { message: favouriteId ? "You unlike a blog" : "you liked a blog" };
  } catch (err) {
    console.log(err);
    return { message: err.message };
  }
};
export const AddCommentAction = async (prevState, formData) => {
  try {
    const profileId = await getAuthUser();
    const rawData = Object.fromEntries(formData);
    rawData.replyingto = rawData.replyingto === "true";
    const data = { ...rawData, profileId };
    const validateFields = await validateWithZodSchema(commentSchema, data);
    await db.comment.create({
      data: validateFields,
    });
    await db.blog.update({
      where: { id: validateFields.blogId },
      data: { comment_count: { increment: 1 } },
      select: { profileId: true },
    });
    revalidatePath(`/blog/${rawData.blogId}`);
    return { message: "comment posted" };
  } catch (err) {
    console.log(err);
    return { message: err.message };
  }
};
export const fetchComment = async (blogId, take, skip) => {
  try {
    const comment = await db.comment.findMany({
      take: take,
      skip: skip,
      orderBy: [{ createdAt: "desc" }],
      where: { blogId: blogId, replyingto: false },
      select: {
        id: true,
        blogId: true,
        comment: true,
        replyingto: true,
        profileId: true,
        children: true,
        profile: {
          select: {
            firstName: true,
            lastName: true,
            profileImage: true,
            username: true,
          },
        },
      },
    });
    return comment;
  } catch (err) {
    console.log(err);
  }
};
export const postCommentReply = async (prevState, formData) => {
  try {
    const profileId = await getAuthUser();
    const rawData = Object.fromEntries(formData);
    rawData.replyingto = rawData.replyingto === "true";
    const data = { ...rawData, profileId };
    const validateFields = await validateWithZodSchema(commentSchema, data);
    await db.comment.update({
      where: { id: rawData.parentId },
      data: {
        children: {
          create: {
            comment: validateFields.comment,
            blogId: validateFields.blogId,
            replyingto: true,
            profileId: profileId,
          },
        },
      },
    });
     revalidatePath(`/blog/${validateFields.blogId}`);
  } catch (err) {
    console.log(err);
    return { message: err.message };
  }
 
};
export const fetchCommentReply = async (commentId, take, skip) => {
  try {
    const comment = await db.comment.findMany({
      take: take,
      skip: skip,
      orderBy: [{ createdAt: "desc" }],
      where: {
        parentId: commentId,
        replyingto: true,
      },
      select: {
        id: true,
        comment: true,
        blogId:true,
        createdAt: true,
        updatedAt: true,
        profile: {
          select: {
            firstName: true,
            lastName: true,
            profileImage: true,
            username: true,
          },
        },
      },
    });
    return comment;
  } catch (err) {
    console.log(err);
  }
};

export const postDeleteReply = async (id,blogId,main) => {
  try {
    const res=await db.comment.delete({
      where:{
        id:id
      }
    })
    if(main==="main comment"){
       await db.blog.update({
         where: { id: blogId },
         data: { comment_count: { increment: -1 } },
         select: { profileId: true },
       });
       revalidatePath(`/blog/${blogId}`);
       return res
    }
  } catch (err) {
    console.log(err);
  }
};
