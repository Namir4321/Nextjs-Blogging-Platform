"use client";
import { formatDate } from "@/utils/format";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import StatusCard from "@/components/Card/StatusCard";
import BlogStatusCard from "./BlogStatusCard";
import EditblogButton from "@/components/BlogView/EditblogButton";
import FormContainer from "../form/FormContainer";
import DeleteCard from "@/components/Card/DeleteCard"
const DashBlog = ({ Blog }) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className=" flex gap-10 border-b mb-6 max-md:px-4 border-gray-50 dark:border-muted pb-6 items-center">
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
          <div className="flex gap-6 mt-4   ">
            <EditblogButton blog={Blog} className="underline  mt-1" />

            <Button
              variant="icon"
              size="default"
              className="lg:hidden pr-4 py-2 underline "
              onClick={() => setShow((prev) => !prev)}
            >
              Stats
            </Button>
            <DeleteCard BlogId={Blog.id}/>
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

export default DashBlog;
