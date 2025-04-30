import { Button } from "@/components/ui/button";
import VerificationTable from "@/components/basic/VerificationTable";
import { Link } from "react-router-dom";

export default function Vett() {
  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-header">All Verifications</h1>
        <Link
          to="new"
        >
          <Button className="uppercase red-gradient" size="lg">
            Start New Verification
          </Button>
        </Link>
      </div>

      <div className="tableHeight w-full bg-white border-[1px] border-stroke-clr rounded-xl overflow-hidden">
        <VerificationTable />
      </div>
    </div>
  );
}
