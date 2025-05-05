import Code from "@/components/Code";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

export default function ApiKey() {
  return (
    <div className="pb-10">
      <h1 className="text-2xl font-semibold mb-6">API Key</h1>
      <p className="mb-6">
        The API Key is an authentication token required for making API calls.
        Two keys are generated for each application:
      </p>

      <ol className="list-disc ml-10 mb-6">
        <li>
          <b>Public Key</b>: Used for making requests in the sandbox
          environment.
        </li>
        <li>
          <b>Private Key</b>: Used for making requests in the live environment.
        </li>
      </ol>

      <p className="mb-6">
        You must include the appropriate key in the request header as{" "}
        <span className="pill">api_key</span> based on the environment you are
        using.
      </p>

      <div className="mb-6">
        <h3 className="text-lg font-semibold">How to Obtain Your API Keys</h3>
        <ol className="list-disc ml-10">
          <li>Log in to the Vettme website.</li>
          <li>
            Navigate to the <b>Applications</b> section.
          </li>
          <li>Select your application to view its details.</li>
          <li>
            Locate the <b>API Keys</b> section to find your <b>Public Key</b>{" "}
            and <b>Private Key</b>.
          </li>
        </ol>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">
          Environment-Specific Usage
        </h3>
        <div className="pl-4 mb-4">
          <p className="font-semibold">Sandbox Environment</p>
          <p className="my-2">
            Pass the Public Key as <span className="pill">api_key</span> in the
            request header when making requests to the sandbox URL.
          </p>
          <Code header="http" body="api_key: your_public_key_here" />
        </div>
        <div className="pl-4 mb-4">
          <p className="font-semibold">Live Environment</p>
          <p className="my-2">
            Pass the Private Key as <span className="pill">api_key</span> in the
            request header when making requests to the live URL.
          </p>
          <Code header="http" body="api_key: your_private_key_here" />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold">Notes</h3>
        <ul className="list-disc ml-10">
          <li>
            Always use the <b>Public Key</b> for testing and development in the
            sandbox environment.
          </li>
          <li>
            Transition to the <b>Private Key</b> only for live production
            operations.
          </li>
          <li>
            Keep both keys confidential to prevent unauthorized access to your
            application.
          </li>
        </ul>
      </div>

      <div className="flex justify-between items-center pt-10">
        <Link to="/docs/app_id">
          <Button variant="ghost">
            <ArrowLeftIcon /> Application ID
          </Button>
        </Link>

        <Link to="/docs/bvn">
          <Button variant="ghost">
            BVN
            <ArrowRightIcon />
          </Button>
        </Link>
      </div>
    </div>
  );
}
