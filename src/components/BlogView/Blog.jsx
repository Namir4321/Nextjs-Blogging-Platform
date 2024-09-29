import { fetchSingleBlogPost } from "@/utils/action";
import React from "react";
import ImageContainer from "@/components/BlogView/ImageContainer";
import Image from "next/image";
import Title from "@/components/BlogView/Title";
import UserInfo from "@/components/BlogView/UserInfo";
import BlogInteraction from "@/components/BlogView/BlogInteraction";
import SimillarBlog from "@/components/BlogView/SimillarBlog";
import EditorRedux from "../EditorDiv/EditorRedux";

const Blog = async ({ blogId }) => {
  const blog = await fetchSingleBlogPost(blogId);

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-[900px] center  py-5  max-lg:px-[5vw]">
        <ImageContainer
          mainimage={blog.banner}
          name={blog.title}
          className="w-full h-[400px]"
        />
        <Title className="text-4xl mt-12" text={blog.title}></Title>
        <p className="text-xl mt-12">{blog.description}</p>
        <UserInfo
          className="mt-12"
          profile={blog.profile}
          published={blog.createdAt}
        />
        <BlogInteraction blog={blog} />
        <EditorRedux id="dispaly-content" readOnly={true} data={blog.content} />
        <SimillarBlog blog={blog} />
      </div>
    </div>
  );
};

export default Blog;
