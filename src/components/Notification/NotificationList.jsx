import NotificationButton from "@/components/Notification/CategoryButton";
import {
  fetchCommentNotification,
  fetchNotification,
  getAuthUser,
} from "@/utils/action";
import EmptyList from "@/components/Notification/EmptyList";
import NotificationCard from "@/components/Notification/NotificationCard";
import { Button } from "../ui/button";
const NotificationList = async ({ category }) => {
  const userId = await getAuthUser();
  let notification = [];
  if (category === "reply") {
    notification = await fetchCommentNotification("reply");
  } else if (category === "comment") {
    notification = await fetchCommentNotification("comment");
  } else if (category === "like") {
    notification = await fetchCommentNotification("like");
  } else if (!category) {
    notification = await fetchNotification();
  }

  if (notification.length === 0) {
    return (
      <EmptyList
        heading="No Notifications"
        message={category ? "Look for other notifications." : "Read Blogs"}
        btnText={category ? "All Notification" : "Blogs"}
        link={category}
      />
    );
  }
  return (
    <div>
      
      {notification.map((item) => (
        <>
          <NotificationCard key={item.id} notification={item} userId={userId} />
        </>
      ))}
    </div>
  );
};

export default NotificationList;
