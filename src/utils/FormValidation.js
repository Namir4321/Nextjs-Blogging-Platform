import * as z from "zod";
import { ZodSchema } from "zod";

export const validateWithZodSchema = async (schema, data) => {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.errors.map((error) => error.message);
    throw new Error(errors.join(", ") || errors);
  }
  return result.data;
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
export const imageSchema = z.object({
  image: validateFile(),
});
function validateFile() {
  const maxUploadSize = 5 * 1024 * 1024;
  const acceptedFileTypes = ["image/"];
  return z
    .instanceof(File)
    .refine((file) => {
      return file || file.size <= maxUploadSize;
    }, "File size be must be less than 5mb")
    .refine((file) => {
      return (
        !file || acceptedFileTypes.some((type) => file.type.startsWith(type))
      );
    }, "File must be an image");
}

export const BlogSchema = z.object({
  banner: z.string().url("Invalid URL format"),
  content: z.object({
    time: z.number().positive("Invalid timestamp"),
    blocks: z
      .array(z.any())
      .min(2, { message: "There should be at least two Content" }),

    version: z.string(),
  }),
  description: z
    .string()
    .max(255, "Description too long")
    .min(10, "Description is too short"),
  Tag: z
    .array(z.string())
    .min(4, "At least four tag required")
    .max(10, "Too many tags"),
  title: z.string().min(5, "Title is required").max(100, "Title too long"),
  profileId: z.string().uuid("Please login in first to publish"),
});
export const commentSchema = z.object({
  comment: z.string().min(2, "write something to leave a comment"),
  profileId: z.string().uuid("Please login in first to publish"),
  blogId: z.string().uuid("Please login in first to publish"),
  UserId: z.string().uuid("Please login in first to publish").optional(),
  replyingto: z.boolean(),
  blogAuthor: z.string().uuid("Please login in first to publish").optional(),
});

export const DraftSchema = z.object({
  banner: z.string().url("Invalid URL format").optional(),
  content: z.object({
    time: z.number().positive("Invalid timestamp"),
    blocks: z
      .array(z.any())
      .min(1, { message: "There should be at least two Content" }),

    version: z.string(),
  }),
  description: z.string().optional(),
  draft: z.boolean(),
  Tag: z.array(z.string()).optional(),
  title: z.string().min(5, "Title is required").max(100, "Title too long"),
  profileId: z.string().uuid("Please login in first to publish"),
});

export const profileUpdateSchema = z.object({
  username: z
    .string()
    .regex(/^@.+\d{3}$/, {
      message:
        "Must start with '@', followed by more than three characters, and end with three digits.",
    })
    .refine((value) => value.length > 5, {
      message: "Must have more than three characters after '@'.",
    }),

  Bio: z
    .string()
    .optional()
    .nullable()
    .refine((val) => val === null || val === "" || val.length > 5, {
      message: "Bio must be more than 5 characters",
    }),
  youtube: z
    .string()
    .optional()
    .refine((val) => val === "" || z.string().url().safeParse(val).success, {
      message: "Invalid URL format",
    }),

  instagram: z
    .string()
    .optional()
    .refine((val) => val === "" || z.string().url().safeParse(val).success, {
      message: "Invalid URL format",
    }),

  facebook: z
    .string()
    .optional()
    .refine((val) => val === "" || z.string().url().safeParse(val).success, {
      message: "Invalid URL format",
    }),

  twitter: z
    .string()
    .optional()
    .refine((val) => val === "" || z.string().url().safeParse(val).success, {
      message: "Invalid URL format",
    }),

  github: z
    .string()
    .optional()
    .refine((val) => val === "" || z.string().url().safeParse(val).success, {
      message: "Invalid URL format",
    }),

  website: z
    .string()
    .optional()
    .refine((val) => val === "" || z.string().url().safeParse(val).success, {
      message: "Invalid URL format",
    }),
});
