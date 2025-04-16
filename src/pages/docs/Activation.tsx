import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon, StarFilledIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

export default function Activation() {
  return (
    <div className="pb-10">
      <h1 className="text-2xl font-semibold mb-6">User Onboarding & Activation</h1>

      <h2 className="mb-6">Signup Process</h2>
      <ol>
        <li className="flex items-center gap-2 mb-3"><StarFilledIcon/>Users sign up with their company name, company ID, email, phone number, and password.</li>
        <li className="flex items-center gap-2 mb-3"><StarFilledIcon/>A confirmation email is sent to verify the provided email.</li>
      </ol>
      <h2 className="my-6">Company Compliance Verification</h2>
      <ol>
        <li className="flex items-center gap-2 mb-3"><StarFilledIcon/>Admin verifies the company compliance within 24 hours.</li>
        <li className="flex items-center gap-2 mb-3"><StarFilledIcon/>Once verified, an activation email is sent to the user.</li>
        <li className="flex items-center gap-2 mb-3"><StarFilledIcon/>After activation, users gain access to the dashboard.</li>
      </ol>

      <div className="flex justify-between w-full mt-[150px]">
        <Link to="/docs/features">
          <Button variant="ghost">
          <ArrowLeftIcon /> Features
          </Button>
        </Link>
        <Link to="/docs/verification">
          <Button variant="ghost">
            Verification Request <ArrowRightIcon />
          </Button>
        </Link>
      </div>
    </div>
  );
}