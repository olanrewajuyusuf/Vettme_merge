import axios from "axios";
import toast from "react-hot-toast";
import { NavigateFunction } from "react-router-dom";
import { baseUrl } from "../baseUrl";

// Sign in
export const AdminLogin = async (
  data: any,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: NavigateFunction
) => {
  setIsLoading(true);
  const toastId = toast.loading("Logging in...", { id: "authToast" });

  await axios
    .post(`${baseUrl}/admin/auth/login`, data)
    .then((res) => {
      toast.success(res?.data?.message || "Admin logged in successful", {
        id: toastId,
      });

      navigate("/back-office");
      
      // Save token to local storage
      const token = res.data.token;
      const id = res.data.company.id;

      sessionStorage.setItem("adminToken", token);
      sessionStorage.setItem("adminId", id);
    })
    .catch((err) => {
      toast.error(err?.response?.data?.message || "Unable to log in", {
        id: toastId,
      });
    })
    .finally(() => setIsLoading(false));
};