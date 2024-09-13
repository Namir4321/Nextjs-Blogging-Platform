import InPageNavigation from "@/components/InPageNavigation/InPageNavigation";
const HomePage = () => {
  return (
    <section className="h-cover flex justify-center gap-10">
      <div className="w-full">
        <InPageNavigation
          routes={["home", "trending blogs"]}
          defaultHidden={["trending blogs"]}
        >
          <h1>Latest Blogs Here</h1>
          <h1>Trending Blogs Here</h1>
        </InPageNavigation>
      </div>
    </section>
  );
};

export default HomePage;
