import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Signup as SignupCall } from "@/api/auth";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [cred, setCred] = useState({
    company_name: "",
    company_id: "",
    email: "",
    password: "",
    phone_number: ""
  });

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form));
    console.log(data);
    
    
    SignupCall(data, setIsLoading, navigate);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Create your Account</h1>

      <form onSubmit={handleSignup} className="mt-[50px] w-full">
        <label htmlFor="company_name" className="block mb-3">
          <p className="text-sm">Company Name</p>
          <Input
            type="text"
            name="companyName"
            placeholder="e.g. Your Company"
            disabled={isLoading}
            required
            id="company_name"
            value={cred.company_name}
            onChange={(e) => setCred({ ...cred, company_name: e.target.value })}
          />
        </label>

        <label htmlFor="company_id" className="block mb-3">
          <p className="text-sm">Company ID</p>
          <Input
            type="text"
            name="companyId"
            placeholder="RF127001"
            disabled={isLoading}
            id="company_id"
            required
            value={cred.company_id}
            onChange={(e) => setCred({ ...cred, company_id: e.target.value })}
          />
        </label>

        <label htmlFor="email" className="block mb-3">
          <p className="text-sm">Email Address</p>
          <Input
            type="email"
            name="email"
            placeholder="e.g. yourcompany@email.com"
            disabled={isLoading}
            id="email"
            required
            value={cred.email}
            onChange={(e) => setCred({ ...cred, email: e.target.value })}
          />
        </label>

        <label htmlFor="phone_number" className="block mb-3">
          <p className="text-sm">Phone Number</p>
          <Input
            type="text"
            name="phone_number"
            placeholder="e.g. 08000000000"
            disabled={isLoading}
            id="phone_number"
            required
            value={cred.phone_number}
            onChange={(e) => setCred({ ...cred, phone_number: e.target.value })}
          />
        </label>

        <label htmlFor="password" className="block mb-3">
          <p className="text-sm">Password</p>
          <div className="relative flex items-center">
            <Input
              type={passwordVisible ? "password" : "text"}
              name="password"
              placeholder="********"
              disabled={isLoading}
              id="password"
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
          className="w-full red-gradient mt-5"
          disabled={
            isLoading || cred.email.length < 5 || cred.password.length < 8
          }
          type="submit"
        >
          {isLoading ? <Loader /> : "Create Account"}
        </Button>
      </form>

      <div className="flex gap-2 mt-5">
        <p className="text-sm">
          Already have an account?{" "}
          <span className="text-red-clr font-medium">
            <Link to="/auth/login">Sign in</Link>
          </span>
          instead
        </p>
      </div>
    </div>
  );
}
