import { getProfileFromUserId, postDeleteReply } from "@/utils/action";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { formatDate } from "@/utils/format";
import { Button } from "../ui/button";

const CommentReplyCard = ({ notification, userId, setRefresh }) => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const fetchProfile = async () => {
      const fetch = await getProfileFromUserId(userId);
      setUser(fetch);
    };
    fetchProfile();
  }, [userId, notification]);

  const userReplies =
    notification?.children
      ?.filter((item) => item.profile.id === userId)
      .map((item) => item) || [];
  

  const handleDelete = async (id) => {
    await postDeleteReply(id);
    setRefresh(prev=>!prev)
  };
console.log(`replies on ${userReplies[0].comment}`)
  return (
    <div className=" p-5 bg-gray-200 mt-10  w-full sm:w-4/6 rounded-lg ">
      <div className="flex gap-3 mb-3">
        <Image
          src={user.profileImage}
          className="w-8 h-8 rounded-full"
          width={40}
          height={40}
        />
        <div>
          <h1 className="font-medium text-xl text-gray-100">
            <Link
              href={`/profile/${user.username}`}
              className="mx-1 text-black underline"
            >
              you
            </Link>
            <span className="font-normal text-gray-500">replied to </span>
            <Link href={``} className="mx-1 text-black underline">
              {" "}
              {userReplies[0].profile.username}
            </Link>
          </h1>
        </div>
      </div>
      <p className="ml-14 font-serif text-black text-xl my-2">
        {userReplies[0].comment}
      </p>
      <Button
        variant="icon"
        size="icon"
        className="underline"
        onClick={() => handleDelete(userReplies[0].id)}
      >
        Delete
      </Button>
    </div>
  );
};

export default CommentReplyCard;
