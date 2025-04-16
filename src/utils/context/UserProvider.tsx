import { createContext, useEffect, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
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
  balance: number;
  setBalance: (balance: number) => void;
}

// Create the UserContext
export const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

// Define the UserProvider component
export const UserProvider = ({ children }: UserProviderProps) => {
  const [company, setCompany] = useState<UserContextType["company"]>(null);
  const [balance, setBalance] = useState<number>(0);
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
        navigate("/auth/login");
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
        setCompany(data.result.company);
        setBalance(data.result.company.balance);
      } catch (error) {
        console.error("Failed to fetch company info:", error);
      }
    };

    getCompany();
  }, [navigate, fetchCompany]);

  return (
    <UserContext.Provider value={{ company, balance, setBalance }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
