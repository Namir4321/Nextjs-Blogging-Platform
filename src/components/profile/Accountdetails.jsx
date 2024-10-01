import { getAuthUser } from "@/utils/action";
import Image from "next/image";
import Link from "next/link";
import AboutUser from "@/components/profile/AboutUser";
const Accountdetails = async({profile}) => {
    const user = await getAuthUser();
  return (
    <>
      <Image
        src={profile.profileImage}
        alt={profile.firstName}
        width={300}
        height={300}
        className="w-28 h-24 bg-gray-100 rounded-full md:w-32 md:h-32"
      />
      <h1 className="text-2xl font-medium">{profile.username}</h1>
      <p className="text-xl capitalize h-6">
        {profile.firstName} {profile.lastName}
      </p>
      <p>
        {profile.Blog.length.toLocaleString()} Blogs -
        {profile.Blog.map((blog) => blog.read_count)
          .reduce((sum, num) => sum + num, 0)
          .toLocaleString()}{" "}
        Reads
      </p>
      {profile.id === user && (
        <div className="=flex justify-center gap-4  mt-2">
          <Link
            href="/setting/edit-profile"
            className="bg-gray-200 dark:bg-muted rounded-md p-2 "
          >
            Edit Profile
          </Link>
        </div>
      )}
      <AboutUser
        className="max-md:hidden "
        bio={profile.bio}
        social_links={profile.Social_Links}
        joinedAt={profile.createdAt}
      />
    </>
  );
}

export default Accountdetails