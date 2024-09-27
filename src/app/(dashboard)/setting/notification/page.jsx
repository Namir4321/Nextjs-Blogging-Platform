import CategoryButton from "@/components/Notification/CategoryButton";
import NotificationList from "@/components/Notification/NotificationList";
const NotificationPage = ({ searchParams }) => {
  return (
    <div className="w-full container">
      <CategoryButton category={searchParams.category} />
      <NotificationList category={searchParams.category} />
    </div>
  );
};

export default NotificationPage;
