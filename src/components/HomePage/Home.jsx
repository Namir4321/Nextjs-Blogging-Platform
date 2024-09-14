'use client'
import InPageNavigation from "@/components/InPageNavigation/InPageNavigation";
import Loading from "@/components/HomePage/Loading";
import BlogContainer from "@/components/HomePage/BlogContainer";
import TrendingContainer from "@/components/HomePage/TrendingContainer";
import TrendingBlock from "@/components/HomePage/TrendingBlock";
import { Suspense, useState } from "react";

const HomePage =  () => {
const [selectedTag,setSelectedTag]=useState(0)
  return (
    <section className=" h-cover flex justify-center gap-10">
      <section className="container w-full">
        <InPageNavigation
          routes={["home", "trending blogs"]}
          defaultHidden={["trending blogs"]}
        >
          <Suspense fallback={<Loading />}>
            <BlogContainer selectedTag={selectedTag} />
          </Suspense>
          <Suspense fallback={<Loading />}>
            <TrendingContainer />
          </Suspense>
        </InPageNavigation>
      </section>
      <div className="min-w-[40%] lg:min-w-[400px] max-w-min border-1 border-gray-300 pl-8 pt-3 max-md:hidden">
        <TrendingBlock setSelectedTag={setSelectedTag}/>
      </div>
    </section>
  );
};

export default HomePage;
