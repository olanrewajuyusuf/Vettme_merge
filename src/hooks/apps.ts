import { axiosInstance } from "@/api/axiosConfig";
import { useQuery } from "@tanstack/react-query";
import { SetStateAction } from "react";
import toast from "react-hot-toast";

export const useFetchApps = () => {
  const fetchApps = async () => {
    try {
      const res = await axiosInstance.get("/user/application");

      return await res.data;
    } catch (error) {
      throw new Error("Failed to fetch applications");
    }
  };

  return useQuery({
    queryKey: ["Applications"],
    queryFn: fetchApps,
    staleTime: 1000 * 60 * 2,
    select: (data) => data.applications,
  });
};

export const useFetchAppLogs = (appId: string) => {
  const fetchLogs = async () => {
    try {
      const res = await axiosInstance.get(`/user/application/${appId}`);
      return await res.data;
    } catch (error) {
      throw new Error("Failed to fetch applications");
    }
  };

  return useQuery({
    queryKey: ["Logs", appId],
    queryFn: fetchLogs,
    staleTime: 1000 * 60 * 2,
  });
};

export const useFetchRecentActivities = () => {
  const fetchRecentActivities = async () => {
    try {
      const res = await axiosInstance.get("/user/application/recent");
      return await res.data;
    } catch (error) {
      throw new Error("Failed to fetch recent activities");
    }
  };

  return useQuery({
    queryKey: ["Recent Activities"],
    queryFn: fetchRecentActivities,
    staleTime: 1000 * 60 * 2,
    select: (data) => data.activities,
  });
};

export const handleAppDelete = async (
  appId: string,
  setIsLoading: React.Dispatch<SetStateAction<boolean>>,
  setIsOpen: React.Dispatch<SetStateAction<boolean>>,
  queryClient: any
) => {
  setIsLoading(true);

  const toastId = toast.loading("Deleting App", { id: "deleteToast" });

  await axiosInstance
    .delete(`/user/application/${appId}`)
    .then((res) => {
      toast.success(res?.data?.message || "Application deleted successfully", {
        id: toastId,
      });
      queryClient.invalidateQueries({
        queryKey: ["Applications"],
      });
      setIsOpen(false);
    })
    .catch((err) => {
      toast.error(
        err?.response?.data?.message || "Something went wrong. Please retry",
        { id: toastId }
      );
    })
    .finally(() => {
      setIsLoading(false);
    });
};
