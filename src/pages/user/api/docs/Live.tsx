import images from "@/assets/Images";
import Code from "@/components/Code";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

export default function Live() {
  return (
    <div className="pb-10">
      <h1 className="text-2xl font-semibold mb-6">Sandbox Environment</h1>
      <p className="mb-6">
        The Live environment is the production environment where your API
        requests interact with real data and incur charges. Use this environment
        only after completing your development and testing in the <b>Sandbox</b>
        .
      </p>

      <div className="mb-6">
        <h3 className="text-lg font-semibold">Key Features</h3>
        <ol className="list-disc ml-10">
          <li>Processes real verification data.</li>
          <li>Charges apply based on usage.</li>
          <li>Ensures accurate and reliable results.</li>
        </ol>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold">Authentication</h3>
        <ol className="list-disc ml-10">
          <li>
            Use the <b>Private Key</b> provided with your application as the{" "}
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
        <Code header="andruino" body="https://api.vettme.ng/api/v1/live" />
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Example Request</h3>
        <div className="api-img">
          <img src={images.liveImg} alt="Sandbox test" className="w-full" />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold">Notes</h3>
        <ul className="list-disc ml-10">
          <li>
            Double-check your API keys and endpoints before making live
            requests.
          </li>
          <li>
            Ensure adequate monitoring of API usage to avoid unexpected charges.
          </li>
          <p>Secure your private API key to prevent unauthorized access.</p>
        </ul>
      </div>

      <div className="flex justify-between items-center pt-10">
        <Link to="/docs/sandbox">
          <Button variant="ghost">
            <ArrowLeftIcon />
            Sandbox Environment
          </Button>
        </Link>

        <Link to="/docs/bvn">
          <Button variant="ghost">
            Lookup BVN
            <ArrowRightIcon />
          </Button>
        </Link>
      </div>
    </div>
  );
}
