import { LoadingCard } from "@/components/HomePage/Loading";
import InPageNavigation from "@/components/InPageNavigation/InPageNavigation";
import NavSearch from "@/components/Navbar/NavSearch";
import { Suspense } from "react";
import BlogContainerDash from "@/components/Dashboard/BlogContainerDash";
import DraftContainerDash from "@/components/Dashboard/DraftContainerDash";

const page = (searchParams) => {
  return (
    <div className="mt-2">
      <section className="">
        <InPageNavigation
          routes={["published", "Draft"]}
          defaultHidden={["Draft"]}
        >
          <Suspense fallback={<LoadingCard />}>
          <BlogContainerDash/>
          </Suspense>
          <Suspense fallback={<LoadingCard />}>
          <DraftContainerDash/>
          </Suspense>
        </InPageNavigation>
      </section>
    </div>
  );
};

export default page;
