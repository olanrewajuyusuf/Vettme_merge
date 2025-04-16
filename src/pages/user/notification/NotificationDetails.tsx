import { NotificationSkeleton } from "@/components/SkeletonUi";
import { useFetchNotifications } from "@/hooks/company";
import { formatTimeAgo } from "@/lib/formatter";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Notifications {
  id: string;
  title: string;
  details: string;
  read: boolean;
  createdAt: string;
}

export default function NotificationDetail() {
  const [notification, setNotification] = useState<Notifications | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { fetchNotifications } = useFetchNotifications();
  const { id } = useParams();

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const data = await fetchNotifications();
        const note = data.data.find((item: any) => item.id === id);
        if (note) {
          setNotification(note);
        } else {
          setError("Notification not found");
        }
      } catch (error) {
        console.error("Failed to fetch Notifications:", error);
        setError("Failed to fetch notifications");
      } finally {
        setLoading(false);
      }
    };
    getNotifications();
  }, [fetchNotifications, id]);

  if (loading) {
    return <NotificationSkeleton />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!notification) {
    return <div>No notification found</div>;
  }

  return (
    <div className="flex justify-center items-center">
      <div className="w-[50%]">
        <div className="bg-white rounded-xl p-5 mb-5 flex justify-between items-center shadow-md shadow-gray-500">
          <div className="flex items-center gap-2">
            <div
              className={`bg-purple-400 w-10 h-10 aspect-square rounded-full flex items-center justify-center text-sm`}
            >
              {notification.title.slice(0, 2).toUpperCase()}
            </div>
            <h3>{notification.title}</h3>
          </div>
          <span className="text-xs">{formatTimeAgo(notification.createdAt)}</span>
        </div>
        <div className="bg-white rounded-xl p-5 min-h-80 shadow-md shadow-gray-500">
          <p>{notification.details}</p>
        </div>
      </div>
    </div>
  );
}