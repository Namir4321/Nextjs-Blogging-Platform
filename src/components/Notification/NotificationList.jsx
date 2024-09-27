import NotificationButton from "@/components/Notification/CategoryButton";
import { fetchCommentNotification, fetchNotification } from "@/utils/action";
import EmptyList from "@/components/Notification/EmptyList";
import NotificationCard from "@/components/Notification/NotificationCard";
const NotificationList = async ({ category }) => {
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
  console.log(`it is notified  ${notification}`);
  return (
    <div>
      {notification.map((item) => (
        <NotificationCard key={item.id} notification={item} />
      ))}
    </div>
  );
};

export default NotificationList;
