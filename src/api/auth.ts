import axios from "axios";
import toast from "react-hot-toast";
import { NavigateFunction } from "react-router-dom";
import { baseUrl } from "./baseUrl";
import { SetStateAction } from "react";

// Sign in
export const Login = async (
  data: any,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: NavigateFunction
) => {
  setIsLoading(true);
  const toastId = toast.loading("Signing in...", { id: "authToast" });

  await axios
    .post(`${baseUrl}/auth/login`, data)
    .then((res) => {
      toast.success(res?.data?.message || "Sign in successful", {
        id: toastId,
      });

      navigate("/");

      // Save company id and token to local storage
      const token = res.data.token;
      const companyId = res.data.company.id;

      localStorage.setItem("token", token);
      localStorage.setItem("companyId", companyId);
    })
    .catch((err) => {
      toast.error(err?.response?.data?.message || "Unable to sign in", {
        id: toastId,
      });
    })
    .finally(() => setIsLoading(false));
};

// Create Account
export const Signup = async (
  data: any,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: NavigateFunction
) => {
  setIsLoading(true);
  const toastId = toast.loading("Creating account...", { id: "authToast" });
  console.log(baseUrl);
  

  await axios
    .post(`${baseUrl}/auth/signup`, data)
    .then((res) => {
      toast.success(res?.data?.message || "Account creation successful", {
        id: toastId,
      });
      console.log(res.data);
      navigate("/auth/confirm-mail");
    })
    .catch((err) => {
      toast.error(err?.response?.data?.message || "Unable to create account", {
        id: toastId,
      });
    })
    .finally(() => setIsLoading(false));
};

// Activate Account
export const ActivateAccount = async (
  token: string,
  setStatus: React.Dispatch<
    React.SetStateAction<"pending" | "success" | "fail" | "conflict" | null>
  >
) => {
  setStatus("pending");
  const toastId = toast.loading("Creating account...", { id: "authToast" });
  await axios
    .post(`${baseUrl}/auth/activate`, { token })
    .then((res) => {
      if (res.status === 202) {
        setStatus("conflict");
        toast.success(res?.data?.message || "Account already activated", {
          id: toastId,
        });
        return;
      } else {
        setStatus("success");
        toast.success(res?.data?.message || "Account activated successfully", {
          id: toastId,
        });
      }
    })
    .catch((err) => {
      setStatus("fail");
      toast.error(
        err?.response?.data?.message || "Unable to activate account",
        {
          id: toastId,
        }
      );
    });
};

// Resend Activation Link
export const resendActivationLink = async (
  token: string,
  navigate: NavigateFunction,
  setStatus: React.Dispatch<
    React.SetStateAction<"pending" | "success" | "fail" | "conflict" | null>
  >
) => {
  setStatus("pending");
  const toastId = toast.loading("Resending link", { id: "authToast" });

  await axios
    .post(`${baseUrl}/auth/resend-link`, { token })
    .then((res) => {
      toast.success(res?.data?.message || "Activation link resent", {
        id: toastId,
      });
      navigate("/auth/confirm-email");
    })
    .catch((err) => {
      if (err.status === 409) {
        toast.error(
          err?.response?.data?.message || "Company account already active",
          { id: toastId }
        );
        setStatus("conflict");
        return;
      }
      toast.error(err?.response?.data?.message || "Unable to resend link", {
        id: toastId,
      });

      setStatus("fail");
    });
};

// Forgot Password
export const ForgotPassword = async (
  data: string,
  navigate: NavigateFunction,
  setIsLoading: React.Dispatch<SetStateAction<boolean>>
) => {
  setIsLoading(true);
  const toastId = toast.loading("Fetching company account", {
    id: "authToast",
  });

  await axios
    .post(`${baseUrl}/auth/forgot-password`, { data })
    .then((res) => {
      toast.success(
        res?.data?.message || "Password reset URL sent to your email",
        { id: toastId }
      );
      navigate("/auth/confirm-recovery-email");
    })
    .catch((err) => {
      toast.error(
        err?.response?.data?.message || "Unable to fetch company account",
        { id: toastId }
      );
    })
    .finally(() => setIsLoading(false));
};

// Reset Password
export const ResetPassword = async (
  data: {},
  setIsLoading: React.Dispatch<SetStateAction<boolean>>,
  setShowModal: React.Dispatch<SetStateAction<boolean>>
) => {
  setIsLoading(true);
  const toastId = toast.loading("Resetting password", { id: "authToast" });
  await axios
    .post(`${baseUrl}/auth/reset-password`, data)
    .then((res) => {
      toast.success(res?.data?.message || "Password reset successful.", {
        id: toastId,
      });
      setShowModal(true);
    })
    .catch((err) => {
      toast.success(
        err?.response?.data?.message || "Unable to reset password",
        { id: toastId }
      );
    })
    .finally(() => setIsLoading(false));
};

// Verify email
export const EmailVerification = async (
  id: string | undefined,
  navigate: NavigateFunction
) => {
  const toastId = toast.loading("Verifying email", { id: "verifyToast" });
  await axios
    .put(`${baseUrl}/auth/verify-email/${id}`)
    .then((res) => {
      toast.success(res?.data?.message || "Email verified", {
        id: toastId,
      });
      navigate('/auth/email-success')
    })
    .catch((err) => {
      toast.error(
        err?.response?.data?.message || "Unable to verify email",
        { id: toastId }
      );
    })
};