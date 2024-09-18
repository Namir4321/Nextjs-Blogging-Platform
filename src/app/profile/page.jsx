import Profile from "@/components/profile/Profile";
import {
  fetchUserAction,
  getAuthUser,
  getProfileFromUserId,
} from "@/utils/action";
const page = async () => {
  const UserId = await getAuthUser();
  const profileId = await getProfileFromUserId(UserId);
  
  return (
    <div>
      <Profile profileId={profileId.username} />
    </div>
  );
};

export default page;
