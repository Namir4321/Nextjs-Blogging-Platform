import { fetchtrendingBlogAction } from "@/utils/action";
import TrendingList from "@/components/HomePage/TrendingList";
const TrendingContainer = async() => {
    const blogs=await fetchtrendingBlogAction();
 if (blogs.length === 0) {
   return (
     <>
       <h6>Loading...</h6>
     </>
   );
 }
 return <TrendingList blogs={blogs} />; 
};

export default TrendingContainer;
