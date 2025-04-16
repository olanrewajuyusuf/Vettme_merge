import axios from "axios";
import { baseUrl } from "./baseUrl";
export const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 1000 * 60, // One Minute
  headers: {
    "Content-Type": "application/json",
  },
});

// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token") || "";
//   config.headers.token = token;

//   return config;
// });

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token") || "";
    console.log('token', token);
    
    if (config.headers) {
      config.headers.set("Authorization", `Bearer ${token}`);
    } else {
      config.headers = new axios.AxiosHeaders({
        Authorization: `Bearer ${token}`,
      });
    }

    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);


export const axiosAdminInstance = axios.create({
  baseURL: `${baseUrl}/admin`,
  timeout: 1000 * 60, // One Minute
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
axiosAdminInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken") || "";
    console.log('token', token);
    
    if (config.headers) {
      config.headers.set("Authorization", `Bearer ${token}`);
    } else {
      config.headers = new axios.AxiosHeaders({
        Authorization: `Bearer ${token}`,
      });
    }

    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Response Interceptor (Optional)
axiosAdminInstance.interceptors.response.use(
  (response) => response, // Pass the response through unmodified
  (error) => {
    console.error("Response error:", error);
    return Promise.reject(error);
  }
);

