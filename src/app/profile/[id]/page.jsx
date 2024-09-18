import Profile from "@/components/profile/Profile"
const ProfilePage = ({params}) => {
   const profileId = decodeURIComponent(params.id)
  return (
    <div>
      <Profile profileId={profileId} />
    </div>
  );
}

export default ProfilePage