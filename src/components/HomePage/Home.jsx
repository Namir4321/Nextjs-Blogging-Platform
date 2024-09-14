'use client'
import InPageNavigation from "@/components/InPageNavigation/InPageNavigation";
import { LoadingMainCard } from "@/components/HomePage/Loading";
import BlogContainer from "@/components/HomePage/BlogContainer";
import TrendingContainer from "@/components/HomePage/TrendingContainer";
import TrendingBlock from "@/components/HomePage/TrendingBlock";
import { Suspense, useState } from "react";

const HomePage =  () => {
const [selectedTag,setSelectedTag]=useState("home")
  return (
    <section className=" h-cover flex justify-center gap-10">
      <section className="container w-full">
        <InPageNavigation
          routes={[selectedTag, "trending blogs"]}
          defaultHidden={["trending blogs"]}
        >
          <Suspense fallback={<LoadingMainCard />}>
            <BlogContainer selectedTag={selectedTag} />
          </Suspense>
          <Suspense fallback={<LoadingMainCard />}>
            <TrendingContainer />
          </Suspense>
        </InPageNavigation>
      </section>
      <div className="min-w-[40%] lg:min-w-[400px] max-w-min border-1 border-gray-300  pt-3 max-md:hidden">
        <TrendingBlock selectedTag={selectedTag} setSelectedTag={setSelectedTag}/>
      </div>
    </section>
  );
};

export default HomePage;
