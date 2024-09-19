import { updateReadCount } from "@/utils/action";
import Blog from "@/components/BlogView/Blog";
const BlogPage = async({params}) => {
const blog=await updateReadCount(params.id)
  return (
    <div className="w-full">
        <Blog blogId={params.id}/>
    </div>
  )
}

export default BlogPage