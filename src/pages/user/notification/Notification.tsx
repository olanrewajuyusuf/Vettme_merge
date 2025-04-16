import { NotificationsSkeleton } from "@/components/SkeletonUi";
import { useFetchNotifications, useReadNote } from "@/hooks/company";
import { formatTimeAgo } from "@/lib/formatter";
import { useNotification } from "@/utils/context/useNotification";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

interface Notifications {
  id: string;
  title: string;
  details: string;
  createdAt: string;
  read: boolean;
}

export default function Notification() {
  const [notifications, setNotifications] = useState<Notifications[] | null>(null);
  const { setUnreadCount } = useNotification();
  const { fetchNotifications } = useFetchNotifications();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { ReadNote } = useReadNote();
  const navigate = useNavigate();

  // Use `useSearchParams` to manage the filter state in the URL
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get("filter") || "all"; // Default to "all" if no filter is set

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const data = await fetchNotifications();
        setNotifications(data.data);
        const unread = data.data.filter((notification: Notifications) => !notification.read).length;
        setUnreadCount(unread);
      } catch (error) {
        console.error("Failed to fetch Notification:", error);
        setError("Failed to fetch notifications");
      } finally {
        setLoading(false);
      }
    };
    getNotifications();
  }, [fetchNotifications, setUnreadCount]);

  const handleClick = (id: string) => {
    const ReadNotification = async () => {
      try {
        await ReadNote(id);
        const data = await fetchNotifications();
        setNotifications(data.data);
        const unread = data.data.filter((notification: Notifications) => !notification.read).length;
        setUnreadCount(unread);
      } catch (error) {
        console.error("Failed to read:", error);
      }
    };
    ReadNotification();
    navigate(`/notifications/${id}`);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFilter = event.target.value;
    // Update the URL search params with the new filter value
    setSearchParams({ filter: selectedFilter });
  };

  // Filter notifications based on the current filter value
  const filteredNotifications = notifications
    ? filter === "unread"
      ? notifications.filter((notification) => !notification.read)
      : filter === "read"
      ? notifications.filter((notification) => notification.read)
      : notifications
    : null;

  // Check if there are no notifications for the selected filter
  const noNotificationsMessage =
    filteredNotifications && filteredNotifications.length === 0
      ? filter === "unread"
        ? "You have no unread notifications."
        : filter === "read"
        ? "You have no read notifications."
        : "You have no notifications."
      : null;

  return (
    <>
      <div className="mb-[30px] flex justify-between items-center">
        <div>
          <h2>Notifications</h2>
          <p className="text-sm">Keep track of all your account activities</p>
        </div>
        <select
          name="filter"
          id="filter"
          className="btn px-3"
          value={filter}
          onChange={handleFilterChange}
        >
          <option value="all">All</option>
          <option value="unread">Unread</option>
          <option value="read">Read</option>
        </select>
      </div>

      {loading && (
        <NotificationsSkeleton />
      )}
      {error && <div>{error}</div>}

      {/* Display a message if there are no notifications for the selected filter */}
      {noNotificationsMessage && (
        <div className="text-center text-gray-500 py-4">{noNotificationsMessage}</div>
      )}

      {/* Display filtered notifications */}
      {filteredNotifications && filteredNotifications.length > 0 && (
        <>
          {filteredNotifications.map((item, idx) => (
            <div
              key={idx}
              onClick={() => handleClick(item.id)}
              className={`w-full mb-6 ${
                item.read ? "bg-white" : "bg-slate-200"
              } rounded-xl border-stroke-clr border-[1px] p-4 hover:bg-orange-50`}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-10 h-10 aspect-square rounded-full flex items-center justify-center text-sm ${
                    idx % 2 === 0
                      ? "bg-purple-400"
                      : idx % 2 === 1
                      ? "bg-orange-300"
                      : "bg-green-600"
                  }`}
                >
                  {item.title.slice(0, 2).toUpperCase()}
                </div>
                <div className="w-full flex justify-between items-center gap-4">
                  <div className="w-full">
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-xs">
                      {item.details.length > 50 ? item.details.slice(0, 50) + "..." : item.details}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <small className="text-xs min-w-max">{formatTimeAgo(item.createdAt)}</small>
                  <small
                    className={`text-xs ${
                      item.read ? "text-blue-500" : "text-destructive"
                    } min-w-max font-bold`}
                  >
                    {item.read ? "Read" : "Unread"}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
}