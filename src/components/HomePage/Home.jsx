"use client";
import InPageNavigation from "@/components/InPageNavigation/InPageNavigation";
import { LoadingMainCard } from "@/components/HomePage/Loading";
import BlogContainer from "@/components/HomePage/BlogContainer";
import TrendingContainer from "@/components/HomePage/TrendingContainer";
import TrendingBlock from "@/components/HomePage/TrendingBlock";
import { Suspense, useState } from "react";
import PaginationComp from "@/components/HomePage/PaginationComp";
import { useSearchParams } from "next/navigation";
import UserBlock from "@/components/HomePage/UserBlock";
const HomePage = () => {
  const [selectedTag, setSelectedTag] = useState("home");
  const pageParams = useSearchParams();
  const search = pageParams.get("search");
  return (
    <>
      <section className=" h-cover flex justify-center gap-10">
        <section className="container w-full">
          <InPageNavigation
            routes={[
              search ? `Search result for ${search}` : selectedTag,
              search ? "Account Manager":"trending blogs",
            ]}
            defaultHidden={["trending blogs","Account Manager"]}
          >
            <Suspense fallback={<LoadingMainCard />}>
              <BlogContainer selectedTag={selectedTag} />
            </Suspense>
            <Suspense fallback={<LoadingMainCard />}>
            {!search && (
                <TrendingContainer />
              )}
              {search && (
                <UserBlock search={search} />
              )}
              </Suspense>
          </InPageNavigation>
        </section>
        <div className="min-w-[40%] lg:min-w-[400px] max-w-min border-1 border-gray-300  pt-3 max-md:hidden">
          {!search && (
            <TrendingBlock
              selectedTag={selectedTag}
              setSelectedTag={setSelectedTag}
            />
          )}
          {search && <UserBlock search={search} />}
        </div>
      </section>
    </>
  );
};

export default HomePage;
