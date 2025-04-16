// import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
// import { Navigate } from "react-router-dom";
// import Loader from "@/components/Loader";
// import { useFetchCompany } from "@/hooks/company";

// interface UserContextType {
//   company: {
//     id: string;
//     balance: number;
//     companyId: string;
//     companyName: string;
//     email: string;
//     createdAt: string;
//     isActive: string;
//     isVerified: string;
//     phone_number: string;
//     updatedAt: string;
//   };
// }

// interface UserProviderProps {
//   children: ReactNode;
// }

// const UserContext = createContext<UserContextType | undefined>(undefined);

// const UserProvider = ({ children }: UserProviderProps) => {
//   const companyId = useMemo(() => localStorage.getItem("companyId"), []);
//   const token = useMemo(() => localStorage.getItem("token"), []);
//   const [ company, setCompany ] = useState<UserContextType | undefined>(undefined);
//   const [ isLoading, setIsLoading] = useState<boolean>(false);

//   console.log("companyId:", companyId, "token:", token);
//   if (!companyId || !token) return <Navigate to="/auth/login" />;

//   const { fetchCompany } = useFetchCompany();

//   useEffect(() => {
//     if (!token) {
//       localStorage.removeItem("companyId");
//     }

//     setIsLoading(true);
//     const getCompany = async () => {
//       try {
//         const data = await fetchCompany();
//         setCompany(data.result);
//         setIsLoading(false);
//       } catch (error) {
//         console.error("Failed to fetch company info:", error);
//       }
//     };
//     getCompany();
//   }, [token, fetchCompany]);

//   if (isLoading) {
//     return (
//       <div className="w-full h-screen flex items-center justify-center">
//         <Loader />
//       </div>
//     );
//   }

//   if (!isLoading && !company) return <Navigate to="/auth/login" />;

//   return (
//     <UserContext.Provider value={company}>{children}</UserContext.Provider>
//   );
// };

// export { UserContext, UserProvider };


import { createContext, useEffect, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import { useFetchCompany } from "@/hooks/company";

// Define the structure of the context
interface UserContextType {
  company: {
    id: string;
    balance: number;
    companyId: string;
    companyName: string;
    email: string;
    createdAt: string;
    isActive: string;
    isVerified: string;
    phone_number: string;
    updatedAt: string;
  } | null;
}

// Create the UserContext
const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

// Define the UserProvider component
export const UserProvider = ({ children }: UserProviderProps) => {
  const [company, setCompany] = useState<UserContextType["company"]>(null);
  const navigate = useNavigate();
  const { fetchCompany } = useFetchCompany();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const companyId = localStorage.getItem("companyId");

    // Redirect to login if token or companyId is missing
    if (!token || !companyId) {
      navigate("/auth/login");
      return;
    }

    // Validate token expiration
    try {
      const decodedToken: { exp: number } = jwtDecode(token);
      const tokenExpiry = decodedToken.exp;
      const currentTime = Math.floor(Date.now() / 1000);

      if (currentTime > tokenExpiry) {
        navigate("/auth/back-office/login");
        return;
      }
    } catch (error) {
      console.error("Invalid token:", error);
      navigate("/auth/login");
      return;
    }

    // Fetch company data
    const getCompany = async () => {
      try {
        const data = await fetchCompany();
        setCompany(data.result);
      } catch (error) {
        console.error("Failed to fetch company info:", error);
      }
    };

    getCompany();
  }, [navigate, fetchCompany]);

  return (
    <UserContext.Provider value={{ company }}>
      {children}
    </UserContext.Provider>
  );
};

export default {UserProvider, UserContext};
