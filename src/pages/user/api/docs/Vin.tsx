import images from "@/assets/Images";
import Code from "@/components/Code";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

export default function Vin() {
  return (
    <div className="pb-10">
      <h1 className="text-2xl font-semibold mb-6">Lookup Vin</h1>
      <p className="mb-6">
        The Lookup VIN endpoint returns details of a particular Voter's ID
        number
      </p>

      <div className="mb-6">
        <h3 className="text-lg font-semibold">Endpoint</h3>
        <Code header="GET" body="{baseUrl}/vin" />
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Query Parameter</h3>
        <div className="flex gap-4 items-start">
          <div>
            <p className="font-semibold text-sm mb-2">Parameter</p>
            <p>
              vin <sup className="text-red-400">Required</sup>
            </p>
          </div>
          <div>
            <p className="font-semibold text-sm mb-2">Type</p>
            <p>String</p>
          </div>
          <div>
            <p className="font-semibold text-sm mb-2">Description</p>
            <p>A valid voter's ID number</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Example Response</h3>
        <div className="api-img">
          <img src={images.vinImg} alt="Sandbox test" className="w-full" />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">
          Test Credentials for Sandbox
        </h3>
        <p className="mb-2">Kindly use this Test VIN in sandbox Environment</p>
        <p>
          vin = <span className="pill">90F5B1C5B1234567890</span>
        </p>
      </div>

      <div className="flex justify-start items-center pt-10">
        <Link to="/docs/account_number">
          <Button variant="ghost">
            <ArrowLeftIcon /> Lookup Account Number
          </Button>
        </Link>
      </div>
    </div>
  );
}
