import db from "@/utils/db";
import { generateUsername } from "@/lib/Authaction";
import { signUpSchema, validateWithZodSchema } from "@/utils/FormValidation";
import { NextResponse } from "next/server";
export const POST = async (req) => {
  try {
    const data = await req.json();
    const validateFields = await validateWithZodSchema(signUpSchema, data);
    delete validateFields.confirmpassword;
    const existingemail = await db.profile.findUnique({
      where: { email: validateFields.email },
    });
    if (!validateFields)
      return NextResponse.json(
        { message: "Email already exist" },
        { status: 500 }
      );

    if (existingemail)
      return NextResponse.json(
        { message: "Email already exist" },
        { status: 500 }
      );
    const username = await generateUsername(validateFields.email);
    await db.profile.create({
      data: {
        ...validateFields,
        username: username,
        profileImage:
          "https://tizqinoyhtxjnpdbotyk.supabase.co/storage/v1/object/public/hotel-booking-images/no-dp_16.webp",
      },
    });
    return NextResponse.json({ message: "SignUp Sucessfull" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: err }, { status: 500 });
  }
};
