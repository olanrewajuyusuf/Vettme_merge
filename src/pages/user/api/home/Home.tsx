import DashboardChart from "@/components/api/DashboardChart";
import DashboardRecent from "@/components/api/DashboardRecent";
import CreateAppModal from "@/components/api/modal/CreateAppModal";
import { Button } from "@/components/ui/button";

import { useState } from "react";
// import { useContext, useState } from "react";
// import { UserContext } from "@/utils/UserContext";

export default function Home() {
  const [createModal, setCreateModal] = useState(false);
  // const company = useContext(UserContext)?.company;

  return (
    <>
      {<CreateAppModal isOpen={createModal} setIsOpen={setCreateModal} />}
      <div className="flex items-center justify-between mb-6">
        {/* {company?.isVerified ? (
          <div className="px-2 py-0.5 rounded-full bg-green-200 text-[10px] font-medium cursor-pointer">
            LIVE
          </div>
        ) : (
          <div className="px-2 py-0.5 rounded-full bg-red-200 text-[10px] font-medium cursor-pointer">
            SANDBOX
          </div>
        )} */}
        <div className="px-2 py-0.5 rounded-full bg-red-200 text-[10px] font-medium cursor-pointer">
          SANDBOX
        </div>
        <div className="flex items-center gap-6">
          <p>Quick Actions:</p>
          <div className="flex items-center gap-4">
            <Button className="pry-btn" onClick={() => setCreateModal(true)}>
              Create New App
            </Button>
          </div>
        </div>
      </div>
      <div className="h-[300px] bg-white p-2 rounded-xl mb-12">
        <p className="font-semibold text-lg px-3 mb-3">API consumption chart</p>
        <DashboardChart />
      </div>

      <p className="font-semibold mb-2">Recent Activities</p>

      <DashboardRecent />
    </>
  );
}
