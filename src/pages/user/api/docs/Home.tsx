import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div className="h-full pb-10">
      <h1 className="text-2xl font-semibold mb-6">Vettme Docs</h1>

      <p className="mb-6">Welcome to the Vettme API Documentation!</p>
      <p className="mb-6">
        Vettme is a robust personnel verification platform designed to ensure
        secure and reliable verification processes. This API enables developers
        to integrate Vettme's verification services into their applications
        seamlessly.
      </p>

      <p className="mb-6">
        The API supports a variety of services, including verification of BVN,
        NIN, account numbers, phone numbers, driver's licenses, and voter's IDs.
        With support for sandbox and live environments, Vettme ensures a smooth
        development and production workflow.
      </p>

      <div className="flex justify-end w-full mt-[150px]">
        <Link to="/docs/keywords">
          <Button variant="ghost">
            Keyword Definition <ArrowRightIcon />
          </Button>
        </Link>
      </div>
    </div>
  );
}
