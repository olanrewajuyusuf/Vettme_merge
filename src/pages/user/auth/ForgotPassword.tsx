import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Loader from "@/components/Loader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "@/api/baseUrl";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = {data: email};
    
    try{
      await axios.post(`${baseUrl}/auth/forgot-password`, formData)
      navigate("/auth/confirm-email");
    } catch(err){
        console.error(err)
        toast.error("Can not submit form")
    } 
    finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Let's find your Account</h1>
      <p className="my-6 text-center w-[300px] ">
        Provide the email address associated to your account below. If it
        exists, we'll send you a reset link.
      </p>

      <form className="w-full" onSubmit={handleReset}>
        <label htmlFor="email">
          <p className="text-sm">Email Address</p>
          <Input
            type="email"
            required
            placeholder="e.g. yourcompany@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <Button
          className="red-gradient mt-6 min-w-[100px]"
          disabled={isLoading || email.length < 5}
        >
          {isLoading ? <Loader /> : "Send Reset Link"}
        </Button>
      </form>
    </div>
  );
}
