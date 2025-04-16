import React, { createContext, useState } from "react";

type VideoContextType = {
  video: string | null;
  setVideo: (video: string | null) => void;
};

export const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const VideoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [video, setVideo] = useState<string | null>(null);
  return (
    <VideoContext.Provider value={{ video, setVideo }}>
      {children}
    </VideoContext.Provider>
  );
};
