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
import {
  handleUpdateBanner,
  handleUpdateBannerEdit,
} from "@/utils/reduxHelper";
import { useDispatch, useSelector } from "react-redux";

const BlogImageContainer = ({ defaultValue }) => {
  const image = useSelector((state) => state.blogReducer.banner);
  const updateImage = useSelector((state) => state.updateReducer.banner);
  const imageUrl =
    "https://tizqinoyhtxjnpdbotyk.supabase.co/storage/v1/object/public/hotel-booking-images/blog%20banner.png";

  const dispatch = useDispatch();
  const handleFileChange = async (e) => {
    const image = e.target.files[0] || null;
    if (!image) return null;
    const validateFields = await validateWithZodSchema(imageSchema, { image });
    const fullpath = await UploadImage(validateFields.image);
    if (defaultValue) {
      handleUpdateBannerEdit(fullpath, dispatch);
    } else {
      handleUpdateBanner(fullpath, dispatch);
    }
  };
  const imagesrc = defaultValue ? updateImage : image ? image : imageUrl;
  return (
    <div className="mx-auto container">
      <div
        className="relative aspect-video 
      hover:opacity-80 bg-white  "
      >
        <FormContainer action={BlogImageAction}>
          <Label htmlFor="uploadBanner">
            <Image src={imagesrc} alt="" fill objectFit="cover" />
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
