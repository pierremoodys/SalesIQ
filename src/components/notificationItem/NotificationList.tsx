import React from "react";
import NotificationListItem, {
  type Notification,
} from "./NotificationListItem";

interface NotificationListProps {
  notifications: Notification[];
  onNotificationClick?: (notificationId: string) => void;
  onMarkAsRead?: (notificationId: string) => void;
  className?: string;
}

const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  onNotificationClick,
  onMarkAsRead,
  className = "",
}) => {
  if (notifications.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No notifications available.</p>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      {notifications.map((notification) => (
        <NotificationListItem
          key={notification.id}
          notification={notification}
          onClick={onNotificationClick}
          onMarkAsRead={onMarkAsRead}
        />
      ))}
    </div>
  );
};

export default NotificationList;
