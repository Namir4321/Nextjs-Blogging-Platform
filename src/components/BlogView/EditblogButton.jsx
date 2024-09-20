"use client"
import { handleBlogData } from "@/utils/reduxHelper";
import Link from "next/link";
import { useDispatch } from "react-redux";
const EditblogButton = ({ blog }) => {
    const dispatch=useDispatch();
  return (
    <div>
      <p className="underline">
        <Link href={`/blog/create/${blog.id}`}>
        <span onClick={(e)=>handleBlogData(blog,dispatch)} >Edit</span>
        </Link>
      </p>
    </div>
  );
};

export default EditblogButton;
