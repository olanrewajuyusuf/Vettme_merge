
import VerificationTable from "@/components/basic/VerificationTable";
import { RecentVett } from "@/lib/placeholder";
import { Link } from "react-router-dom";
// import { useFetchUserVerifications } from "@/API/Vett";

export default function BasicHome() {
  // const { data: verifications } = useFetchUserVerifications();

  // const successfulVetts = verifications?.filter((vett) => {
  //   return vett.status === "success";
  // });

  // const failedVetts = verifications?.filter((vett) => {
  //   return vett.status === "failure";
  // });

  return (
    <>
      <div className="contEl">
        <div className="w-full bg-white rounded-2xl p-4 border-stroke-clr border-[1px]">
          <p className="text-lg font-semibold w-full text-center mb-3">
            Verifications
          </p>
          <div className="flex justify-center items-center gap-7">
            <div className="flex flex-col items-center-justify-center gap-1">
              <p className="text-xs">Total</p>
              <h2 className="text-header text-center">
                {/* {verifications?.length || "0"} */} 8
              </h2>
            </div>
            <div className="w-0.5 h-10 bg-gray-200"></div>
            <div className="flex flex-col items-center-justify-center gap-1">
              <p className="text-xs">Successful</p>
              <h2 className="text-header text-center text-green-600">
                {/* {successfulVetts?.length || "0"} */} 7
              </h2>
            </div>
            <div className="w-0.5 h-10 bg-gray-200"></div>
            <div className="flex flex-col items-center-justify-center gap-1">
              <p className="text-xs">Failed</p>
              <h2 className="text-header text-center text-red-clr">
                {/* {failedVetts?.length || "0"} */} 1
              </h2>
            </div>
          </div>
        </div>

        <div className="rounded-3xl mt-5 border-[1px] border-stroke-clr bg-white overflow-hidden">
          <div className="flex items-center justify-between p-4 mb-5">
            <p className="text-lg font-semibold">Recent Activities</p>
            <Link to="/basic/verifications" className="text-body border-b hover:text-blue-500">
              See All
            </Link>
          </div>
          <div className="tableHeightSmall">
            <VerificationTable VerificationsPlaceholder={RecentVett} />
          </div>
        </div>
      </div>
    </>
  );
}
