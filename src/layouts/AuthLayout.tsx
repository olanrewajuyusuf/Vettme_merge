import images from "@/assets/Images";
import { ReactNode } from "react";

interface AuthProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthProps) {
  return (
    <div className="flex h-screen">
      <div className="flex-1 h-full overflow-hidden">
        <img
          src={images.authImg}
          alt="Auth"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-[450px] px-10 pb-10 overflow-scroll">
        <img
          src={images.logo}
          alt="Vettme"
          className="w-[90px] mx-auto my-[40px]"
        />
        {children}
      </div>
    </div>
  );
}
