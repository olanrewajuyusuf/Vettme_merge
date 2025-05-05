import images from "@/assets/Images";
import Code from "@/components/Code";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

export default function Sandbox() {
  return (
    <div className="pb-10">
      <h1 className="text-2xl font-semibold mb-6">Sandbox Environment</h1>
      <p className="mb-6">
        The Sandbox environment is a testing environment that allows developers
        to integrate and test the Vettme API without interacting with real data
        or incurring any charges. It is ideal for ensuring your implementation
        works as expected before going live.
      </p>

      <div className="mb-6">
        <h3 className="text-lg font-semibold">Key Features</h3>
        <ol className="list-disc ml-10">
          <li>Simulates API responses for testing purposes.</li>
          <li>No charges are applied for requests.</li>
          <li>Does not interact with live verification data.</li>
          <li>Ideal for development and debugging.</li>
        </ol>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold">Authentication</h3>
        <ol className="list-disc ml-10">
          <li>
            Use the <b>Public Key</b> provided with your application as the{" "}
            <span className="pill">api_key</span> in the request header.
          </li>
          <li>
            Include your <b>Application ID</b> as{" "}
            <span className="pill">app_id</span> in the request header.
          </li>
        </ol>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Sandbox Base URL</h3>
        <Code header="andruino" body="https://api.vettme.ng/api/v1/sandbox" />
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Example Request</h3>
        <div className="api-img">
          <img src={images.sandboxImg} alt="Sandbox test" className="w-full" />
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
        <Link to="/docs/api_key">
          <Button variant="ghost">
            <ArrowLeftIcon /> Application ID
          </Button>
        </Link>

        <Link to="/docs/live">
          <Button variant="ghost">
            Live Environment
            <ArrowRightIcon />
          </Button>
        </Link>
      </div>
    </div>
  );
}
