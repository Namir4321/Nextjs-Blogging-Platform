"use client";
import ImageInput from "@/components/form/ImageInput";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import FormContainer from "@/components/form/FormContainer";
import { useEffect, useRef, useState } from "react";
import { ButtonProp } from "../form/ButtonProp";
import { BlogImageAction } from "@/utils/action";
import { Input } from "../ui/input";
import { UploadImage } from "@/utils/supabase";
import { imageSchema, validateWithZodSchema } from "@/utils/FormValidation";
const BlogImageContainer = () => {
  const [imageUrl, setImageUrl] = useState(
    "https://tizqinoyhtxjnpdbotyk.supabase.co/storage/v1/object/public/hotel-booking-images/blog%20banner.png"
  );
  const handleFileChange = async (e) => {
    const image = e.target.files[0] || null;
    if (!image) return null;
    const validateFields = await validateWithZodSchema(imageSchema, { image });
    const fullpath = await UploadImage(validateFields.image);
    setImageUrl(fullpath);
  };
  return (
    <div className="mx-auto max-w-[900px]">
      <div
        className="relative aspect-video 
      hover:opacity-80 bg-white  border-4 border-gray-100"
      >
        <FormContainer action={BlogImageAction}>
          <Label htmlFor="uploadBanner">
            <Image
              src={imageUrl}
              alt=""
              fill
              objectFit="cover"
            />
            <Input
              type="file"
              accept="image/*"
              id="uploadBanner"
              onChange={handleFileChange}
            />
          </Label>
        </FormContainer>
      </div>
    </div>
  );
};

export default BlogImageContainer;
