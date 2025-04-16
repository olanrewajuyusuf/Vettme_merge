import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminLogin } from "@/api/back-office/auth";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [cred, setCred] = useState({
    email: "",
    password: "",
  });

  const handleSignin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form));

    console.log(data);

    AdminLogin(data, setIsLoading, navigate);
  };

  return (
    <div className="md:w-[40%] h-svh mx-auto p-5 flex items-center justify-center">
      <form onSubmit={handleSignin} className="w-full">
        <h1 className="text-center mb-20">Admin Login</h1>
        <label htmlFor="email" className="block">
          <p className="text-sm">Email Address</p>
          <Input
            type="email"
            placeholder="e.g. yourcompany@email.com"
            disabled={isLoading}
            id="email"
            name="email"
            required
            value={cred.email}
            onChange={(e) => setCred({ ...cred, email: e.target.value })}
          />
        </label>

        <label htmlFor="password" className="block mt-6">
          <p className="text-sm">Password</p>
          <div className="relative flex items-center">
            <Input
              type={passwordVisible ? "password" : "text"}
              placeholder="********"
              disabled={isLoading}
              id="password"
              name="password"
              required
              value={cred.password}
              onChange={(e) => setCred({ ...cred, password: e.target.value })}
            />
            {cred.password.length > 0 && (
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
            isLoading || cred.email.length < 5 || cred.password.length < 8
          }
          type="submit"
        >
          {isLoading ? <Loader /> : "Sign In"}
        </Button>
      </form>
    </div>
  );
}
