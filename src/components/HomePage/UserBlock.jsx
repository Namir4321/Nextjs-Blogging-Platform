import { fetchUserAction } from "@/utils/action";
import { useEffect, useState } from "react";
import { CiUser } from "react-icons/ci";
import { LoadingTrendCard } from "./Loading";
import Userlist from "@/components/HomePage/Userlist"
const UserBlock = ({ search }) => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const user = await fetchUserAction(search);
        setUsers(user);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [search]);
  if (loading) {
    return <LoadingTrendCard />;
  }
  return (
    <div className="mb-4">
      <h1 className="flex mt-4 items-center font-medium text-lg mb-8">
        User related to search
        <CiUser className="ml-2" />
      </h1>
      {users.length === 0 ? (
        <h6 className="flex items-center justify-center dark:bg-muted bg-gray-100 mt-5">
          No user found for this username...
        </h6>
      ) : (
        <Userlist users={users} />
      )}
    </div>
  );
};

export default UserBlock;
