const BlogStatusCard = ({ Blog }) => {
  return (
    <div className="flex gap-2 max-lg:mb-6 max-lg:pb-6 border-grey max-lg:vborder-b">
      <div className="flex flex-col items-center w-full">
        <h1 className="text-xl lg:text-2xl mb-2 font-bold">
          {Blog.like_count.toLocaleString()}
        </h1>
        <p className="max-lg:text-gray-400  capitalize">Likes</p>
      </div>
      <div className="flex flex-col items-center w-full">
        <h1 className="text-xl lg:text-2xl mb-2 font-bold">
          {Blog.comment_count.toLocaleString()}
        </h1>
        <p className="max-lg:text-gray-400  capitalize">Comments</p>
      </div>
      <div className="flex flex-col items-center w-full">
        <h1 className="text-xl lg:text-2xl mb-2 font-bold">
          {Blog.read_count.toLocaleString()}
        </h1>
        <p className="max-lg:text-gray-400  capitalize">Reads</p>
      </div>
    </div>
  );
};

export default BlogStatusCard;
