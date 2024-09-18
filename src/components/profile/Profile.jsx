import {
  fetchProfile,
  fetchUserAction,
  getBlogfromUserId,
} from "@/utils/action";
import { Suspense } from "react";
import { LoadingCard, LoadingMainCard } from "../HomePage/Loading";
import Accountdetails from "@/components/profile/Accountdetails";
import InPageNavigation from "@/components/InPageNavigation/InPageNavigation";
import BlogList from "../HomePage/BlogList";
import Social from "./Social";
import AboutUser from "./AboutUser";
const Profile = async ({ profileId }) => {
  const profile = await fetchProfile(profileId);
  const blogs = await getBlogfromUserId(profile.id);
  return (
    <div>
      <section className=" h-cover md:flex flex-row-reverse  gap-5 min-[1100px]:gap-12">
        <div className="flex flex-col max-md:items-center  mt-6 gap-5 min-w-[300px]    ">
          <Accountdetails profile={profile} />
        </div>
        <div className=" w-full mt-6 ">
          <InPageNavigation
            routes={["Blogs Published", "About"]}
            defaultHidden={["About"]}
          >
            <Suspense fallback={<LoadingMainCard />}>
              {blogs.length > 0 ? (
                <div className="container">
                  <BlogList blogs={blogs} />
                </div>
              ) : (
                <p className="container bg-gray-100">No blogs yet</p>
              )}
            </Suspense>
            <Suspense fallback={<LoadingCard />}>
              <AboutUser
                className="container"
                bio={profile.bio}
                social_links={profile.Social_Links}
                joinedAt={profile.createdAt}
              />
            </Suspense>
          </InPageNavigation>
        </div>
      </section>
    </div>
  );
};

export default Profile;
