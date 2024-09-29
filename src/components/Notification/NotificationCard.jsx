import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import ReplyCard from "@/components/Notification/ReplyCard";

const NotificationCard = ({ notification,userId }) => {
  console.log(notification)
  return (
    <div className="mt-2" key={notification.id}>
      <div
        className={`p-6 border-b border-gray-100 border  ${
          notification.seen == false ? "border-l-black border-l-2" : ""
        }`}
      >
        <div className="flex gap-5 mb-3">
          <Image
            src={notification.profile.profileImage}
            alt={notification.profile.name}
            className="w-14 h-14 rounded-full"
            height={40}
            width={40}
          />
          <div className="w-full">
            <h1 className="text-sm">
              <span className="mr-1"></span>
              <Link
                href={`/profile/${notification.profile.username}`}
                className="underline font-semibold"
              >
                {notification.profile.username}
              </Link>
              <span className="ml-1">
                {notification.type === "like"
                  ? "liked your blog"
                  : notification.type === "comment"
                  ? "commented on"
                  : "replied on"}
              </span>
            </h1>
            {notification.type === "reply" ? (
              <div className="p-4 mt-4 rounded-md bg-gray-100 w-full sm:w-3/2">
                <p>{notification.comment.comment}</p>
              </div>
            ) : (
              <Link
                href={`/blog/${notification.blog.id}`}
                className="font-medium text-gray-500 hover:underline line-clamp-1"
              >
                {notification.blog.title}
              </Link>
            )}
          </div>
        </div>
        {notification.type !== "like" && notification.comment ? (
          <p className="ml-14 pl-5 font-sarif text-xl my-5">
            {notification.comment.comment}
          </p>
        ) : (
          ""
        )}
        <ReplyCard notification={notification} userId={userId} />
      </div>
    </div>
  );
};

export default NotificationCard;
