import TrendCard from "@/components/Card/TrendCard";
const TrendingList = ({blogs}) => {
  return (
    <section className="gap-8 container">
      {blogs.map((blog,i) => {
        return <TrendCard key={blog.id} index={i} blog={blog} />;
      })}
    </section>
  );
}

export default TrendingList