import Skeleton from "@/components/Skeleton";
import { Suspense, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function BackOfficeIndex() {
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = sessionStorage.getItem("adminToken");    

    if (!adminToken) {
      navigate("/auth/back-office/login");
      return;
    }

    try {
      const decodedToken: { exp: number } = jwtDecode(adminToken);
      const tokenExpiry = decodedToken.exp;
      const currentTime = Math.floor(Date.now() / 1000);

      if (currentTime > tokenExpiry) {
        navigate("/auth/back-office/login");
      }
    } catch (error) {
      console.error("Invalid token:", error);
      navigate("/auth/back-office/login");
    }
  }, [navigate]);

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
  );
}
