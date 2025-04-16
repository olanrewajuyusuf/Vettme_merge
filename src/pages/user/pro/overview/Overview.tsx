import DashboardChart from "@/components/DashboardChart";
import { CardSkeleton, RecentSkeleton } from "@/components/SkeletonUi";
import { useFetchCardData, useFetchNotifications, useReadNote } from "@/hooks/company";
import { formatTimeAgo } from "@/lib/formatter";
import { useNotification } from "@/utils/context/useNotification";
import { useEffect, useState } from "react";
import { FaRegTimesCircle } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdPendingActions } from "react-icons/md";
import { PiClockUserBold } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";

interface CardProps {
  verified: number,
  inprogress: number,
  pending: number,
  failed: number,
}

interface Notifications {
  id: string,
  title: string,
  details: string,
  createdAt: string,
  read: boolean,
}

export default function ProDashboard() {
  const [cardData, setCardData] = useState<CardProps | null>(null);
  const [notifications, setNotifications] = useState<Notifications[] | null>(null);
  const { setUnreadCount } = useNotification();
  const { fetchNotifications } = useFetchNotifications();
  const { fetchCardData } = useFetchCardData();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { ReadNote } = useReadNote();
  const navigate = useNavigate();

  useEffect(() => {
    const getCardData = async () => {
      try {
        const data = await fetchCardData();
          setCardData(data.data);
      } catch (error) {
        console.error("Failed to fetch card data:", error);
      } finally {
        setLoading(false);
      }
    };

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
    getCardData();
  }, [fetchCardData, fetchNotifications, setUnreadCount]);

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

  // Sort notifications by `createdAt` in descending order (most recent first)
  const sortedNotifications = notifications
    ? [...notifications].sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      })
    : null;

  // Get the 5 most recent notifications (or fewer if there are less than 5)
  const recentNotifications = sortedNotifications
    ? sortedNotifications.slice(0, 5)
    : null;

  const cards = [
    {
      title: "Successful Verifications",
      qty: cardData?.verified,
      bg: 1,
    },
    {
      title: "Pending Verifications",
      qty: cardData?.pending,
      bg: 2,
    },
    {
      title: "Ongoing Verifications",
      qty: cardData?.inprogress,
      bg: 3,
    },
    {
      title: "Failed Verifications",
      qty: cardData?.failed,
      bg: 4,
    },
  ];

  return (
    <div className="">
      <div className="grid grid-cols-4 gap-6 mb-6">
      {loading && (
        <>
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        </>
      )}
        {!loading && cards.map((card, idx) => (
          <div
            key={idx}
            className="w-full p-4 rounded-xl border-[1px] border-stroke-clr bg-white"
          >
            <div className="w-20 h-20 grid place-items-center rounded-lg bg-gray-100 border border-stroke-clr mb-5">
              <span
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                  card.bg === 1
                    ? "bg-green-600"
                    : card.bg === 2
                    ? "bg-yellow-500"
                    : card.bg === 3
                    ? "bg-purple-700"
                    : "bg-red-600"
                }`}
              >
                {card.bg === 1
                  ? <IoMdCheckmarkCircleOutline />
                  : card.bg === 2
                  ? <MdPendingActions />
                  : card.bg === 3
                  ? <PiClockUserBold />
                  : <FaRegTimesCircle />
                }
              </span>
            </div>
            <p className="font-medium">{card.title}</p>
            <h1 className="mt-4">{card.qty}</h1>
          </div>
        ))}
      </div>

      <div className="w-full h-[300px] p-4 bg-white border-[1px] border-stroke-clr rounded-xl mb-6">
        <DashboardChart />
      </div>

      <div className="w-full p-4 bg-white border-[1px] border-stroke-clr rounded-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">Recent Activities</h3>
          <Link to="/notifications" className="text-sm hover:underline">
            See All
          </Link>
        </div>

        {loading && (<RecentSkeleton />)}
        {error && <div>{error}</div>}

        {recentNotifications?.map((item, idx) => (
          <div
            key={idx}
            onClick={() => handleClick(item.id)}
            className="w-full mt-4  bg-white rounded-xl border-stroke-clr border-[1px] p-4 hover:bg-gray-50"
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
      </div>
    </div>
  );
}
