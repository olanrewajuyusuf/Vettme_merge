import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
export default function Keywords() {
  return (
    <div className="h-full pb-10">
      <h1 className="text-2xl font-semibold mb-6">Keywords</h1>
      <p className="mb-6">
        Here are some key terms you'll encounter in this documentation:
      </p>
      <div className="mb-6">
        <p className="text-lg font-semibold">App ID</p>
        <p className="text-sm">
          A secret token used to authenticate requests made to the API
        </p>
      </div>

      <div className="mb-6">
        <p className="text-lg font-semibold">Public Key</p>
        <p className="text-sm">Used for the sandbox environment.</p>
      </div>

      <div className="mb-6">
        <p className="text-lg font-semibold">Private Key</p>
        <p className="text-sm">Used for the live environment.</p>
      </div>

      <div className="mb-6">
        <p className="text-lg font-semibold">Sandbox</p>
        <p className="text-sm">
          The testing environment for API integration, where verification
          requests are not charged or processed against live data.
        </p>
      </div>

      <div className="mb-6">
        <p className="text-lg font-semibold">Live</p>
        <p className="text-sm">
          The production environment where requests interact with real data and
          incur charges.
        </p>
      </div>

      <div className="mb-6">
        <p className="text-lg font-semibold">Request Header</p>
        <p className="text-sm">
          <b>Request Header</b>: A component of the HTTP request where the span{" "}
          <span className="pill">app_id</span> and{" "}
          <span className="pill">api_key</span> are passed for authentication.
        </p>
      </div>

      <div className="flex justify-between items-center pt-10">
        <Link to="/docs">
          <Button variant="ghost">
            <ArrowLeftIcon /> Introduction
          </Button>
        </Link>

        <Link to="/docs/app_id">
          <Button variant="ghost">
            Application ID
            <ArrowRightIcon />
          </Button>
        </Link>
      </div>
    </div>
  );
}
