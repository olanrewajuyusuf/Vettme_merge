import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Login as LoginCall } from "@/api/auth";

export default function Login() {
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

    LoginCall(data, setIsLoading, navigate);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Sign in to your Account</h1>

      <form onSubmit={handleSignin} className="mt-[50px] w-full">
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
        <div className="w-full flex justify-end my-1">
          <Link
            to="/auth/forgot-password"
            className="text-xs hover:text-red-clr hover:underline"
          >
            Forgotten Password?
          </Link>
        </div>

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

      <div className="absolute bottom-10 flex gap-2">
        <p className="text-sm">
          Don't have an account?{" "}
          <span className="text-red-clr font-medium">
            <Link to="/auth/register">Sign up </Link>
          </span>
          instead
        </p>
      </div>
    </div>
  );
}
