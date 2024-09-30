"use client";
import { formatDate } from "@/utils/format";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import StatusCard from "@/components/Card/StatusCard";
import BlogStatusCard from "./BlogStatusCard";
import EditblogButton from "@/components/BlogView/EditblogButton";
import { DeleteBlogAction } from "@/utils/action";
import FormContainer from "../form/FormContainer";
const DashBlog = ({ Blog }) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className=" flex gap-10 border-b mb-6 max-md:px-4 border-gray-50 pb-6 items-center">
        <Image
          src={Blog.banner}
          alt="blog.title"
          height={300}
          width={300}
          className="max-md:hidden lg:hidden xl:block w-28 h-28 flex-none bg-gray-100 object-cover"
        />
        <div className="flex flex-col justify-center py-2 w-full min-w-[300px]">
          <div className="">
            <Link
              href={`/blog/${Blog.id}`}
              className="mb-4 hover:underline text-2xl font-medium leading-7 line-clamp-3 sm:line-clamp-2"
            >
              {Blog.title}
            </Link>
            <p className="line-clamp-1">
              Published on {formatDate(Blog.createdAt)}
            </p>
          </div>
          <div className="flex gap-6 mt-3   ">
            <EditblogButton blog={Blog} className="underline  mt-1" />

            <Button
              variant="icon"
              size="default"
              className="lg:hidden pr-4 py-2 underline "
              onClick={() => setShow((prev) => !prev)}
            >
              Stats
            </Button>
            <DeleteRental BlogId={Blog.id} />
          </div>
        </div>
        <div className="max-lg:hidden ">
          <BlogStatusCard Blog={Blog} />
        </div>
      </div>
      {show ? (
        <div className="lg:hidden">
          <BlogStatusCard Blog={Blog} />
        </div>
      ) : (
        ""
      )}
    </>
  );
};
const DeleteRental = async ({ BlogId }) => {
  const DeleteBlogPostAction = DeleteBlogAction.bind(null, { BlogId });
  return (
    <FormContainer action={DeleteBlogPostAction}>
      <Button className="text-red-500 underline" variant="icon" size="default">
        Delete
      </Button>
    </FormContainer>
  );
};
export default DashBlog;
