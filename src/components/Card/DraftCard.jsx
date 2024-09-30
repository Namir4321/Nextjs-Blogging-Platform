import Link from "next/link";
import { Button } from "../ui/button";
import EditblogButton from "@/components/BlogView/EditblogButton";
import FormContainer from "../form/FormContainer";
import { DeleteBlogAction } from "@/utils/action";
import DeleteCard from "@/components/Card/DeleteCard";

const DraftCard = ({ Blog, index }) => {
  return (
    <div className="flex gap-5 lg:gap-10 pb-6 border-b mb-6 border-gray-100">
      <h1 className="text-5xl mt-1 sm:text-4xl lg:text-7xl font-bold text-gray-300 leading-none">
        {index < 10 ? "0" + (index + 1) : index}
      </h1>
      <div>
        <h1 className="mb-4  text-2xl font-medium leading-7 line-clamp-3 sm:line-clamp-2">
          {Blog.title}
        </h1>
        <p className="line-clamp-2 font-serif">
          {Blog.description.length ? Blog.description : "No description"}
        </p>
        <div className="flex gap-6 mt-3">
          <EditblogButton blog={Blog} className="underline  mt-1" />
          <DeleteCard BlogId={Blog.id} />
        </div>
      </div>
    </div>
  );
};
export default DraftCard
