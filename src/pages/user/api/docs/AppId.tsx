import Code from "@/components/Code";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

export default function AppId() {
  return (
    <div className="pb-10">
      <h1 className="text-2xl font-semibold mb-6">Application ID</h1>
      <p className="mb-6">
        The Application ID is a unique identifier generated when you create an
        application on the Vettme platform. This ID is required for every API
        request and must be included in the request header as{" "}
        <span className="pill">app_id</span>
      </p>

      <div className="mb-6">
        <h3 className="text-lg font-semibold">
          How to Obtain Your Application ID
        </h3>
        <ol className="list-disc ml-10">
          <li>Log in to the Vettme website.</li>
          <li>
            Navigate to the <b>Applications</b> section.
          </li>
          <li>Create a new application or select an existing one.</li>
          <li>
            Your <b>Application ID</b> will be displayed on the application
            dashboard.
          </li>
        </ol>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold">Example Request Header</h3>
        <Code header="http" body="app_id: your_application_id_here" />
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold">Notes</h3>
        <ul className="list-disc ml-10">
          <li>
            The <b>Application ID</b> is mandatory for all API calls
          </li>
          <li>
            Ensure that you keep your Application ID secure and do not share it
            publicly
          </li>
        </ul>
      </div>

      <div className="flex justify-between items-center pt-10">
        <Link to="/docs/keywords">
          <Button variant="ghost">
            <ArrowLeftIcon /> Keywords
          </Button>
        </Link>

        <Link to="/docs/api_key">
          <Button variant="ghost">
            API Key
            <ArrowRightIcon />
          </Button>
        </Link>
      </div>
    </div>
  );
}
