import toast from "react-hot-toast";
import { baseUrl } from "@/api/baseUrl";
import axios from "axios";
import { useCallback } from "react";


export const useFetchCompany = () => {
  const fetchCompany = useCallback(async () => {
  try {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("companyId");

    if (!token) {
      throw new Error("Authentication token is missing");
    }

    const res = await axios.get(`${baseUrl}/company/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error: any) {
    console.error("Error fetching company info:", error);
    toast.error(error?.response?.data?.message || "Cannot get company info");
    throw new Error(error?.response?.data?.message || "Cannot get company info");
  }
}, []);
return { fetchCompany };
};

// Getting Card data
export const useFetchCardData = () => {
  const fetchCardData = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const companyId = localStorage.getItem("companyId");

      if (!token) {
        throw new Error("Authentication token is missing");
      }

      if (!companyId) {
        throw new Error("Company ID is missing");
      }

      const res = await axios.get(
        `${baseUrl}/verification-response/status/${companyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error: any) {
      console.error("Error fetching card data:", error);
      throw new Error(error?.response?.data?.message || "Cannot get card data");
    }
  }, []);

  return { fetchCardData };
};

// Getting Transaction history
export const useFetchPayment = () => {
  const fetchPayment = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Authentication token is missing");
      }

      const res = await axios.get(
        `${baseUrl}/payment`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error: any) {
      console.error("Error fetching transaction history:", error);
      throw new Error(error?.response?.data?.message || "Cannot get transaction history");
    }
  }, []);

  return { fetchPayment };
};

// Getting Verification Batches
export const useFetchBatches = () => {
  const fetchBatches = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const companyId = localStorage.getItem("companyId");

      if (!token) {
        throw new Error("Authentication token is missing");
      }

      const res = await axios.get(
        `${baseUrl}/verification/${companyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error: any) {
      console.error("Error fetching Verification Batches:", error);
      throw new Error(error?.response?.data?.message || "Cannot get Verification Batches");
    }
  }, []);

  return { fetchBatches };
};

// Getting Verification Batches responses
export const useFetchBatchesResponse = () => {
  const fetchBatchesResponse = useCallback(async (id: string) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Authentication token is missing");
      }

      const res = await axios.get(
        `${baseUrl}/verification-response/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error: any) {
      console.error("Error fetching Verification response:", error);
      throw new Error(error?.response?.data?.message || "Cannot get Verification response");
    }
  }, []);

  return { fetchBatchesResponse };
};

// Getting Verification Batches responses cards
export const useFetchBatchesResponseCards = () => {
  const fetchBatchesResponseCards = useCallback(async (id: string) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Authentication token is missing");
      }

      const res = await axios.get(
        `${baseUrl}/verification/form/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error: any) {
      console.error("Error fetching Verification response cards:", error);
      throw new Error(error?.response?.data?.message || "Cannot get Verification response cards");
    }
  }, []);

  return { fetchBatchesResponseCards };
};

// Getting Notifications
export const useFetchNotifications= () => {
  const fetchNotifications = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const companyId = localStorage.getItem("companyId");

      if (!token) {
        throw new Error("Authentication token is missing");
      }

      const res = await axios.get(
        `${baseUrl}/notifications/${companyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error: any) {
      console.error("Error fetching Notifications:", error);
      throw new Error(error?.response?.data?.message || "Cannot get Notifications");
    }
  }, []);

  return { fetchNotifications };
};

// Activate a companies
export const useReadNote = () => {
  const ReadNote = useCallback(async (notificationId: string) => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Authentication token is missing");
        }

        const res = await axios.put(
          `${baseUrl}/notifications`,
          {notificationId},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        toast.success("Notification read!")
        return res.data;
      } catch (error: any) {
        console.error("Error activating company:", error);
        throw new Error(error?.response?.data?.message || "Cannot activate company");
      }
    },[] 
  );
  return { ReadNote };
};

// Getting Chart data
export const useFetchChart= () => {
  const fetchChart = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const companyId = localStorage.getItem("companyId");

      if (!token) {
        throw new Error("Authentication token is missing");
      }

      const res = await axios.get(
        `${baseUrl}/verification/month/${companyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error: any) {
      console.error("Error fetching Chart data:", error);
      throw new Error(error?.response?.data?.message || "Cannot get Chart data");
    }
  }, []);
  return {fetchChart};
};

// Getting Verification findings data
export const useFetchFinding = () => {
  const fetchFinding = useCallback(async (id: string) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Authentication token is missing");
      }

      const res = await axios.get(
        `${baseUrl}/verification-finding/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error: any) {
      console.error("Error fetching Finding:", error);
      throw new Error(error?.response?.data?.message || "Cannot get Finding");
    }
  }, []);
  return {fetchFinding};
};

export const useFetchVerdict = () => {
  const fetchVerdict = useCallback(async (id: string) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Authentication token is missing");
      }

      const res = await axios.get(
        `${baseUrl}/verification-result/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error: any) {
      console.error("Error fetching Verdict:", error);
      throw new Error(error?.response?.data?.message || "Cannot get Verdict");
    }
  }, []);
  return {fetchVerdict};
};

export const useFetchForm = () => {
  const fetchForm = useCallback(async (id: string) => {
    try {
      const res = await axios.get(
        `${baseUrl}/verification/form/${id}`,
      );
      return res.data;
    } catch (error: any) {
      console.error("Error fetching Form:", error);
      throw new Error(error?.response?.data?.message || "Cannot get Form");
    }
  }, []);
  return {fetchForm};
};

//Getting completion percentage
export const useFetchCompletionPercentage = () => {
  const fetchCompletionPercentage = useCallback(async (id: string) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Authentication token is missing");
      }

      const res = await axios.get(
        `${baseUrl}/verification/completion/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error: any) {
      console.error("Error fetching completion percentage:", error);
      throw new Error(error?.response?.data?.message || "Cannot get completion percentage");
    }
  }, []);
  return {fetchCompletionPercentage};
};

//Getting completion percentage
export const useFetchVerificationRating = () => {
  const fetchVerificationRating = useCallback(async (id: string) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Authentication token is missing");
      }

      const res = await axios.get(
        `${baseUrl}/verification-result/stats/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error: any) {
      console.error("Error fetching verification rating:", error);
      throw new Error(error?.response?.data?.message || "Cannot get verification rating");
    }
  }, []);
  return {fetchVerificationRating};
};


export const useFetchAddresses = () => {

  const fetchAddresses = useCallback(async (id: string) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Authentication token is missing");
    }

    const res = await axios.get(`${baseUrl}/address/one/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error: any) {
    console.error("Error fetching addresses:", error);
    toast.error(error?.response?.data?.message || "Cannot fetch addresses");
    throw new Error(error?.response?.data?.message || "Cannot fetch addresses");
  }
}, []);
return { fetchAddresses };
};