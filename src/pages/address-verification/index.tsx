import Skeleton from "@/components/Skeleton";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

export default function AddressIndex() {

  return (
    <Suspense
      fallback={
        <div className="w-full min-h-[500px] h-full flex items-center justify-center">
          <Skeleton />
        </div>
      }
    >
      <Outlet />
    </Suspense>
  )
}

