import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div id="introduction" className="h-full scroll-mt-24 py-8">
      <h1 className="text-2xl font-semibold mb-6">Vettme Docs</h1>

      <p className="mb-6">Welcome to the Vettme Pro Documentation!</p>
      <p className="mb-6">
      VETTME-PRO is an advanced verification platform designed to verify 
      employees, personnel, loan applicants, and other identity verification needs. 
      It provides a robust verification system, including physical address verification, 
      professional verification, guarantor checks, academic verification, 
      and mental health verification.
      </p>

      <div className="flex justify-end w-full mt-[150px]">
        <Link to="/docs/features">
          <Button variant="ghost">
            Features <ArrowRightIcon />
          </Button>
        </Link>
      </div>
    </div>
  );
}