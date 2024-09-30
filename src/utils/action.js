"use server";
import { auth } from "@/auth";
import db from "@/utils/db";
import {
  BlogSchema,
  commentSchema,
  DraftSchema,
  imageSchema,
  profileUpdateSchema,
  validateWithZodSchema,
} from "./FormValidation";
import { UploadImage } from "@/utils/supabase";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import github from "next-auth/providers/github";
import { profile } from "console";
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
      bio: true,
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
export const ProfileImageAction = async (prevState, formData) => {
  const profile = await getAuthUser();
  try {
    const image = formData.get("image");
    const validateFields = await validateWithZodSchema(imageSchema, { image });
    const fullpath = await UploadImage(validateFields.image);
    await db.profile.update({
      where: { id: profile },
      data: {
        profileImage: fullpath,
      },
    });
  } catch (err) {
    console.log(err);
    return { message: err.message };
  }
  revalidatePath("/setting/edit-profile");
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

export const createDraftAction = async (data) => {
  const user = await getAuthUser();
  const UserId = user;
  try {
    const validateFields = await validateWithZodSchema(DraftSchema, data);
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
  const userId = await getAuthUser();
  try {
    if (userId) {
      const blogs = await db.blog.findMany({
        where: {
          draft: false,
        },

        select: {
          id: true,
          title: true,
          banner: true,
          description: true,
          content: true,
          createdAt: true,
          Tag: true,
          like_count: true,
          comment_count: true,
          read_count: true,
          profile: {
            select: {
              firstName: true,
              lastName: true,
              profileImage: true,
              username: true,
              id: true,
            },
          },
          Favourite: {
            where: { profileId: userId },
            select: { blogId: true },
          },
        },
      });
      return blogs;
    }
    const blogs = await db.blog.findMany({
      select: {
        id: true,
        title: true,
        banner: true,
        description: true,
        content: true,
        createdAt: true,
        Tag: true,
        like_count: true,
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
      where: { draft: false },
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
  } catch (err) {}
};

export const fetchBlogWithFilterAction = async (tagsearch, search) => {
  try {
    const filterBlog = await db.blog.findMany({
      where: {
        draft: false,
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
        like_count: true,
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
  } catch (err) {}
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
  } catch (err) {}
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
  } catch (err) {}
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
  } catch (err) {}
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
        draft: false,
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
  } catch (err) {}
};
export const EditBlogAction = async (data, Blog) => {
  try {
    const UserId = await getAuthUser();
    console.log(Blog);
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
        draft: false,
      },
    });
  } catch (err) {
    console.log(err);
  }
  redirect("/");
};

export const UpdateDraftAction = async (data, Blog) => {
  try {
    const UserId = await getAuthUser();
    const validateFields = await validateWithZodSchema(DraftSchema, data);
    console.log(Blog);
    await db.blog.update({
      where: {
        id: Blog,
        profileId: UserId,
      },
      data: validateFields,
    });
  } catch (err) {
    console.log(err);
  }
  redirect("/");
};
export const fetchFavouriteId = async ({ blogId }) => {
  console.log(blogId);
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
  blogAuthor,
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
      await db.notification.deleteMany({
        where: {
          blogId: blogId,
          notificationId: user,
          profileId: blogAuthor,
          type: "like",
        },
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
      console.log(blogId, favouriteId, pathname, blogAuthor);
      await db.notification.create({
        data: {
          type: "like",
          blogId: blogId,
          notificationId: blogAuthor,
          profileId: user,
        },
      });
    }
    revalidatePath(pathname);
    return { message: favouriteId ? "You unlike a blog" : "you liked a blog" };
  } catch (err) {
    console.log(err);
  }
};
export const AddCommentAction = async (prevState, formData) => {
  try {
    const profileId = await getAuthUser();
    if (!profileId) {
      revalidatePath("/signin");
      return { message: "Login in to comment" };
    }

    const rawData = Object.fromEntries(formData);
    rawData.replyingto = rawData.replyingto === "true";
    const data = { ...rawData, profileId };
    console.log(data);
    const validateFields = await validateWithZodSchema(commentSchema, data);
    const comm = await db.comment.create({
      data: {
        blogId: validateFields.blogId,
        comment: validateFields.comment,
        replyingto: validateFields.replyingto,
        profileId: validateFields.profileId,
      },
    });
    await db.blog.update({
      where: { id: validateFields.blogId },
      data: { comment_count: { increment: 1 } },
      select: { profileId: true },
    });
    if (profileId !== validateFields.UserId) {
      await db.notification.create({
        data: {
          type: "comment",
          blogId: validateFields.blogId,
          profileId: validateFields.profileId,
          notificationId: validateFields.UserId,
          commentId: comm.id,
        },
      });
    }
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
            id: true,
          },
        },
        blog: {
          select: {
            id: true,
            profileId: true,
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
    if (!profileId) {
      revalidatePath("/signin");
      return { message: "Login in to comment" };
    }
    const rawData = Object.fromEntries(formData);
    rawData.replyingto = rawData.replyingto === "true";
    const data = { ...rawData, profileId };
    console.log(data);
    const validateFields = await validateWithZodSchema(commentSchema, data);

    const comma = await db.comment.update({
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
      select: {
        children: {
          select: { id: true },
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
    });

    if (validateFields.blogAuthor !== profileId) {
      const replycomment = await db.notification.create({
        data: {
          type: "reply",
          blogId: validateFields.blogId,
          profileId: profileId,
          notificationId: validateFields.blogAuthor,
          commentId: comma.children[0].id,
        },
      });
    }

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
        blog: {
          select: {
            id: true,
            profileId: true,
          },
        },
      },
    });
    return comment;
  } catch (err) {
    console.log(err);
  }
};

export const postDeleteReply = async (id, blogId, main, blogAuthor) => {
  try {
    const user = await getAuthUser();
    if (!user) {
      revalidatePath("/signin");
      return { message: "Login in to comment" };
    }
    const res = await db.comment.delete({
      where: {
        id: id,
      },
    });
    if (main === "reply comment") {
      if (blogAuthor !== user) {
        await db.notification.deleteMany({
          where: {
            blogId: blogId,
            notificationId: user,
            profileId: blogAuthor,
            type: "reply",
          },
        });
      }
    }
    if (main === "main comment") {
      await db.blog.update({
        where: { id: blogId },
        data: { comment_count: { increment: -1 } },
        select: { profileId: true },
      });
      if (blogAuthor !== user) {
        await db.notification.deleteMany({
          where: {
            blogId: blogId,
            notificationId: user,
            profileId: blogAuthor,
            type: "comment",
          },
        });
      }
      revalidatePath(`/blog/${blogId}`);
      return res;
    }
  } catch (err) {
    console.log(err);
  }
};

export const changePasswordAction = async (prevState, formData) => {
  try {
    const profileId = await getAuthUser();
    const rawData = Object.fromEntries(formData);
    const { password } = await db.profile.findUnique({
      where: { id: profileId },
      select: { password: true },
    });
    if (password === rawData.oldpassword) {
      await db.profile.update({
        where: { id: profileId },
        data: {
          password: rawData.changepassword,
        },
      });
      return { message: "Password Changed" };
    }
  } catch (err) {
    console.log(err);
    return { message: err.message };
  }
};
export const fetchSocialLink = async () => {
  try {
    const userId = await getAuthUser();
    const social = await db.Social_Links.findFirst({
      where: { profileId: userId },
    });
    return social;
  } catch (err) {
    console.log(err);
  }
};
export const UpdateProfileAction = async (prevState, formData) => {
  try {
    const profileId = await getAuthUser();
    const rawData = Object.fromEntries(formData);
    const validateFields = await validateWithZodSchema(
      profileUpdateSchema,
      rawData
    );
    const { id } = await db.Social_Links.findFirst({
      where: { profileId: profileId },
      select: { id: true },
    });
    await db.profile.update({
      where: { id: profileId },
      data: { username: validateFields.username, bio: validateFields.Bio },
    });
    if (id) {
      await db.Social_Links.update({
        where: { id: id },
        data: {
          youtube: validateFields.youtube,
          instagram: validateFields.instagram,
          facebook: validateFields.facebook,
          twitter: validateFields.twitter,
          github: validateFields.github,
          website: validateFields.website,
        },
      });
    } else {
      await db.create.Social_Links.create({
        profileId: profileId,
        youtube: validateFields.youtube,
        instagram: validateFields.instagram,
        facebook: validateFields.facebook,
        twitter: validateFields.twitter,
        github: validateFields.github,
        website: validateFields.website,
      });
    }
  } catch (err) {
    console.log(err);
    return { message: err.message };
  }
  revalidatePath("/setting/edit-profile");
};

export const fetchNotification = async (seenFilter) => {
  const userId = await getAuthUser();
  const whereConditions = {
    notificationId: userId,
  };

  if (seenFilter) {
    whereConditions.seen = seenFilter === "false";
  }
  // const take = 1;
  // const skip = 4;
  if (!userId) return;
  const notified = await db.notification.findMany({
    // skip,
    where: whereConditions,
    select: {
      id: true,
      type: true,
      seen: true,
      profile: {
        select: {
          firstName: true,
          lastName: true,
          profileImage: true,
          username: true,
        },
      },
      comment: {
        select: {
          id: true,
          comment: true,
          createdAt: true,
          children: true,
        },
      },
      blog: {
        select: {
          title: true,
          id: true,
          profileId: true,
        },
      },
    },
  });
  await db.notification.updateMany({
    where: {
      notificationId: userId,
    },
    data: {
      seen: true,
    },
  });

  return notified;
};

export const fetchCommentNotification = async (type) => {
  const userId = await getAuthUser();
  if (!userId) return;
  const notified = await db.notification.findMany({
    where: {
      notificationId: userId,
      type: type,
    },
    select: {
      id: true,
      type: true,

      profile: {
        select: {
          firstName: true,
          lastName: true,
          profileImage: true,
          username: true,
        },
      },
      comment: {
        select: {
          id: true,
          comment: true,
          createdAt: true,
          children: true,
        },
      },
      blog: {
        select: {
          title: true,
          id: true,
          profileId: true,
        },
      },
    },
  });
  return notified;
};
export const fetchSingleComment = async (id) => {
  console.log(id);
  const fetchComment = await db.comment.findUnique({
    where: { id: id },
    select: {
      id: true,
      blog: true,
      comment: true,
      replyingto: true,
      profile: true,
      children: {
        select: {
          id: true,
          blog: true,
          comment: true,
          profile: true,
        },
      },
    },
  });
  return fetchComment;
};
export const fetchBlogFilterAction = async (draftFilter) => {
  const userId = await getAuthUser();
  try {
    if (userId) {
      const blogs = await db.blog.findMany({
        where: { draft: draftFilter, profileId: userId },
        select: {
          id: true,
          title: true,
          banner: true,
          description: true,
          content: true,
          createdAt: true,
          Tag: true,
          like_count: true,
          comment_count: true,
          read_count: true,
          profile: {
            select: {
              firstName: true,
              lastName: true,
              profileImage: true,
              username: true,
              id: true,
            },
          },
          Favourite: {
            where: { profileId: userId },
            select: { blogId: true },
          },
        },
      });
      return blogs;
    }
    const blogs = await db.blog.findMany({
      where: { userId: true },
      select: {
        id: true,
        title: true,
        banner: true,
        description: true,
        content: true,
        createdAt: true,
        Tag: true,
        like_count: true,
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
  }
};
export const DeleteBlogAction = async ({ BlogId }) => {
  const userId = await getAuthUser();
  try {
    await db.blog.delete({
      where: {
        id: BlogId,
        profileId: userId,
      },
    });
    revalidatePath("/setting/blogs");
  } catch (err) {
    return { message: err.message };
  }
};
