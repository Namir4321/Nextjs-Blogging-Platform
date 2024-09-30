"use client"
import { handleBlogData } from "@/utils/reduxHelper";
import Link from "next/link";
import { useDispatch } from "react-redux";
const EditblogButton = ({ blog,className }) => {
    const dispatch=useDispatch();
  return (
    <div>
      <div className={`underline ${className}`}>
        <Link href={`/blog/create/${blog.id}`}>
        <span onClick={(e)=>handleBlogData(blog,dispatch)} >Edit</span>
        </Link>
      </div>
    </div>
  );
};

export default EditblogButton;
