import images from "@/assets/Images";
import Code from "@/components/Code";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

export default function PhoneNumber() {
  return (
    <div className="pb-10">
      <h1 className="text-2xl font-semibold mb-6">Lookup Phone Number</h1>
      <p className="mb-6">
        The Lookup Phone Number endpoint returns details of a particular Phone
        Number
      </p>

      <div className="mb-6">
        <h3 className="text-lg font-semibold">Endpoint</h3>
        <Code header="GET" body="{baseUrl}/phone_number" />
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Query Parameter</h3>
        <div className="flex gap-4 items-start">
          <div>
            <p className="font-semibold text-sm mb-2">Parameter</p>
            <p>
              phone_number <sup className="text-red-400">Required</sup>
            </p>
          </div>
          <div>
            <p className="font-semibold text-sm mb-2">Type</p>
            <p>String</p>
          </div>
          <div>
            <p className="font-semibold text-sm mb-2">Description</p>
            <p>A valid Nigerian phone number in regular format</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Example Response</h3>
        <div className="api-img">
          <img src={images.pnImg} alt="Sandbox test" className="w-full" />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">
          Test Credentials for Sandbox
        </h3>
        <p className="mb-2">
          Kindly use this Test Phone Number in sandbox Environment
        </p>
        <p>
          phone_number = <span className="pill">09011111111</span>
        </p>
      </div>

      <div className="flex justify-between items-center pt-10">
        <Link to="/docs/nin">
          <Button variant="ghost">
            <ArrowLeftIcon /> Lookup NIN
          </Button>
        </Link>

        <Link to="/docs/account_number">
          <Button variant="ghost">
            Lookup Account Number
            <ArrowRightIcon />
          </Button>
        </Link>
      </div>
    </div>
  );
}
