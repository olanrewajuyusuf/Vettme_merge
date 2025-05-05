import images from "@/assets/Images";
import Code from "@/components/Code";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

export default function AccountNumber() {
  return (
    <div className="pb-10">
      <h1 className="text-2xl font-semibold mb-6">Lookup Account Number</h1>
      <p className="mb-6">
        The Lookup Account Number endpoint returns details of a particular
        Account Number
      </p>

      <div className="mb-6">
        <h3 className="text-lg font-semibold">Endpoint</h3>
        <Code header="GET" body="{baseUrl}/account_number" />
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Query Parameter</h3>
        <div className="flex gap-10 items-start">
          <div>
            <p className="font-semibold text-sm mb-2">Parameter</p>
            <p>
              account_number <sup className="text-red-400">Required</sup>
              <br /> bank_code <sup className="text-red-400">Required</sup>
            </p>
          </div>
          <div>
            <p className="font-semibold text-sm mb-2">Type</p>
            <p>String</p>
          </div>
          <div>
            <p className="font-semibold text-sm mb-2">Description</p>
            <p>
              A valid bank account number
              <br />
              and bank code
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Example Response</h3>
        <div className="api-img">
          <img src={images.accImg} alt="Sandbox test" className="w-full" />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">
          Test Credentials for Sandbox
        </h3>
        <p className="mb-2">
          Kindly use this Test Account Number in sandbox Environment
        </p>
        <p className="mb-2">
          account_number = <span className="pill">1234567890</span>
        </p>
        <p>
          bank_code = <span className="pill">058</span>
        </p>
      </div>

      <p className="mb-6">
        You can fetch all banks' bank_code{" "}
        <Link
          to="https://sandbox.interswitchng.com/docbase/docs/autogate-file-transfer/appendix/bank-cbn-codes/"
          className="text-[#2563eb] underline"
        >
          here
        </Link>
      </p>

      <div className="flex justify-between items-center pt-10">
        <Link to="/docs/phone_number">
          <Button variant="ghost">
            <ArrowLeftIcon /> Lookup Phone Number
          </Button>
        </Link>

        <Link to="/docs/vin">
          <Button variant="ghost">
            Lookup Voter's ID
            <ArrowRightIcon />
          </Button>
        </Link>
      </div>
    </div>
  );
}
