'use client'
import { IoTrendingUpSharp } from "react-icons/io5";
import CategoryList from "@/components/HomePage/CategoryList";


const TrendingBlock = ({setSelectedTag}) => {
  return (
    <>
      <div className="flex flex-col gap-10 ">
        <h1 className="font-medium text-xl mb-6 mt-2">
          Stories from all interest
        </h1>
        <div className="">
          <h1 className="font-medium text-xl mb-8 flex gap-1">
            trending
            <IoTrendingUpSharp className="mt-1" />
          </h1>
          <CategoryList setSelectedTag={setSelectedTag} />
        </div>
      </div>
    </>
  );
};

export default TrendingBlock;
