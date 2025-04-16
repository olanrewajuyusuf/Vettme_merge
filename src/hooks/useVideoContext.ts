import { useContext } from "react";
import { VideoContext } from "@/utils/context/VideoContext";

export const useVideoContext = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error("useVideoContext must be used within a VideoProvider");
  }
  return context;
};
