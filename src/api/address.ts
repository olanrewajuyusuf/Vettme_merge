import axios from "axios";
import toast from "react-hot-toast";
import { NavigateFunction } from "react-router-dom";
import { baseUrl } from "./baseUrl";
import { SetStateAction } from "react";

export const VerifiedAddress = async (
  data: any,
  setIsLoading: React.Dispatch<SetStateAction<boolean>>,
  navigate: NavigateFunction
) => {
  setIsLoading(true);
  const toastId = toast.loading("Verifying...", { id: "verifyToast" });

  await axios
    .post(`${baseUrl}/address-verification`, data)
    .then((res) => {
      toast.success(res?.data?.message || "Data submited", {
        id: toastId,
      });
      localStorage.removeItem("landmark")
      localStorage.removeItem("busStop")
      localStorage.removeItem("confirmation")
      navigate("/address-verification/personnelslist");
    })
    .catch((err) => {
      console.error("Error response:", err.response);
      toast.error(err?.response?.data?.message || "Unable to submit", {
        id: toastId,
      });
    })
    .finally(() => setIsLoading(false));
};

export const RegisterAgent = async (
  data: any,
  setIsLoading: React.Dispatch<SetStateAction<boolean>>,
  navigate: NavigateFunction
) => {
  setIsLoading(true);
  const toastId = toast.loading("Registering agent...", { id: "agentToast" });

  await axios
    .post(`${baseUrl}/field-agent/`, data)
    .then((res) => {
      toast.success(res?.data?.message || "Registered Successfully", {
        id: toastId,
      });

      navigate("/address-verification");
    })
    .catch((err) => {
      console.error("Error response:", err.response);
      toast.error(err?.response?.data?.message || "Unable to register", {
        id: toastId,
      });
    })
    .finally(() => setIsLoading(false));
};

//agent signIn
export const Login = async (
  data: any,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: NavigateFunction
) => {
  setIsLoading(true);
  const toastId = toast.loading("Signing in...", { id: "authToast" });

  await axios
    .post(`${baseUrl}/field-agent/login`, data)
    .then((res) => {
      toast.success(res?.data?.message || "Sign in successful", {
        id: toastId,
      });

      navigate("/address-verification/personnelslist");

      // Save company id and token to local storage
      // const token = res.data.token;
      const fieldAgentId = res.data.data.id;

      // localStorage.setItem("token", token);
      localStorage.setItem("fieldAgentId", fieldAgentId);
    })
    .catch((err) => {
      toast.error(err?.response?.data?.message || "Unable to sign in", {
        id: toastId,
      });
    })
    .finally(() => setIsLoading(false));
};