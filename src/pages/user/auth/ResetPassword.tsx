import Loader from "@/components/Loader";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { baseUrl } from "@/api/baseUrl";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const [cred, setCred] = useState({
    pass_1: "",
    pass_2: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  
  const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = {
      token: params.token,
      newPassword: cred.pass_1,
    }
    
    try{
      await axios.post(`${baseUrl}/auth/reset-password2`, formData);
      toast.success("Password reset successfully!");
      navigate("/auth/login");
    } catch(err){
        console.error(err)        
        toast.error("Can not reset your password, Kindly resend your email");
        navigate("/auth/forgot-password");
    } 
    finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Reset your Password</h1>

      <form onSubmit={handleReset} className="mt-[50px] w-full">
        <label htmlFor="pass_1" className="block mt-6">
          <p className="text-sm">New Password</p>
          <div className="relative flex items-center">
            <Input
              type={passwordVisible ? "password" : "text"}
              placeholder="********"
              disabled={isLoading}
              id="pass_1"
              required
              value={cred.pass_1}
              onChange={(e) => setCred({ ...cred, pass_1: e.target.value })}
            />
            {cred.pass_1.length > 0 && (
              <span
                className="absolute right-4"
                onClick={() => setPasswordVisible((prev) => !prev)}
              >
                {passwordVisible ? <EyeOpenIcon /> : <EyeNoneIcon />}
              </span>
            )}
          </div>
        </label>
        <label htmlFor="pass_2" className="block mt-6">
          <p className="text-sm">Confirm Password</p>
          <div className="relative flex items-center">
            <Input
              type={passwordVisible ? "password" : "text"}
              placeholder="********"
              disabled={isLoading}
              id="pass_2"
              required
              value={cred.pass_2}
              onChange={(e) => setCred({ ...cred, pass_2: e.target.value })}
            />
            {cred.pass_2.length > 0 && (
              <span
                className="absolute right-4"
                onClick={() => setPasswordVisible((prev) => !prev)}
              >
                {passwordVisible ? <EyeOpenIcon /> : <EyeNoneIcon />}
              </span>
            )}
          </div>
        </label>

        <Button
          className="w-full red-gradient mt-6"
          disabled={
            isLoading || cred.pass_1.length < 5 || cred.pass_2.length < 8
          }
          type="submit"
        >
          {isLoading ? <Loader /> : "Reset Password"}
        </Button>
      </form>
    </div>
  );
}
