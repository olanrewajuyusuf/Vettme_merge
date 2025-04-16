import Skeleton from "@/components/Skeleton";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

export default function Index() {
  return (
    <Suspense fallback={<Skeleton />}>
      <Outlet />
    </Suspense>
  );
}
