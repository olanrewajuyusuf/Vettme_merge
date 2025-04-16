import axios from "axios";
import toast from "react-hot-toast";
import { baseUrl } from "./baseUrl";

export const CreateForm = async (
  data: any,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
): Promise<any | null> => {
  setIsLoading(true);
  const toastId = toast.loading("Verifying...", { id: "verifyToast" });

  const token = localStorage.getItem("token")

  try {
    const res = await axios.post(
      `${baseUrl}/verification/create-form`,
      data,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    console.log("Server Response:", res);
    console.log("Response Data:", res.data); // Log only data

    if (res.data) {
      toast.success(res?.data?.message || "Form Created", { id: toastId });
      setIsOpen(true);
      return res.data; // Ensure this line is always executed
    } else {
      toast.error("No data returned", { id: toastId });
      return null; // Handle the case where no data is returned
    }
  } catch (error: any) {
    console.error("Error Response:", error.response);

    toast.error(error?.response?.data?.message || "Unable to create form", {
      id: toastId,
    });

    console.error("Error submitting form:", error);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
    }

    return null;
  } finally {
    setIsLoading(false);
  }
};


export const createFormResponse = async (
  data: any,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
): Promise<any | null> => {
  setIsLoading(true);
  const toastId = toast.loading("Verifying...", { id: "verifyToast"})

  try {
    const res = await axios.post(
      `${baseUrl}/verification-response`,
      data
    )

    console.log("Server response", res);
    console.log("Response Data:", res.data);

    if (res.data) {
      toast.success(res?.data.message || "Response Created", { id: toastId});
      return res.data;
    } else {
      toast.error("No data returned", { id: toastId})
      return null;
    }
  }catch (error: any) {
    console.error("Error Response:", error.response);

    toast.error(error?.response?.data?.message || "Form response not submitted", {
      id : toastId,
    })

    console.error("Error submitting form:", error)
    if (error.response) {
      console.error("Response data:", error.response.data)
      console.error("Response status:", error.response.status)
    }

    return null;
  } finally {
    setIsLoading(false)
  }
}