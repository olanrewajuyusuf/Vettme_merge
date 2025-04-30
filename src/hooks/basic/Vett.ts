import { axiosInstance } from "@/api/axiosConfig";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { NavigateFunction } from "react-router-dom";

export const vettPersonnel = async (
  data: any, 
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>, 
  navigate: NavigateFunction
) => {
  setIsLoading(true);
  const toastId = toast.loading("Getting data. This might take a while");

  // restructure data
  let verificationData;
  if (data.vett_data_type === "voters_id") {
    verificationData = {
      title: data.title,
      personnel_name: data.name,
      type: "voters_id",
      data: {
        vin: data.data_num,
      },
    };
  } else if (data.vett_data_type === "nuban") {
    verificationData = {
      title: data.title,
      personnel_name: data.name,
      type: "nuban",
      data: {
        account_number: data.data_num,
        bank_code: data.bank_code,
      },
    };
  } else if (data.vett_data_type === "drivers_license") {
    verificationData = {
      title: data.title,
      personnel_name: data.name,
      type: "drivers_license",
      data: {
        license_number: data.data_num,
      },
    };
  } else {
    verificationData = {
      title: data.title,
      personnel_name: data.name,
      type: data.vett_data_type,
      data: {
        [data.vett_data_type]: data.data_num,
      },
    };
  }

  // Confirm cost of verification
  if (
    confirm("This verification will cost you NGN300. Will you like to proceed?")
  ) {
    // submit data for verification
    await axiosInstance
      .post("/basic/vett", verificationData)
      .then((res) => {
        toast.success(res.data.message, { id: toastId });
        navigate("/basic/verifications/result", { state: res.data.data.entity });
      })
      .catch((err) => {
        toast.error(err.response.data.message, { id: toastId });
      })
      .finally(() => {
        setIsLoading(false);
      });
  } else {
    toast.error("Verification Cancelled", { id: toastId });
    setIsLoading(false);
    return;
  }
};

// Fetch user verifications
export const useFetchUserVerifications = () => {
  const fetchVerifications = () => {
    return axiosInstance.get("/basic/vett");
  };

  return useQuery("User-Verifications", fetchVerifications, {
    select: (data) => data.data.data,
  });
};
