import DashboardChart from "@/components/api/DashboardChart";
import DashboardRecent from "@/components/api/DashboardRecent";
import CreateAppModal from "@/components/api/modal/CreateAppModal";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Home() {
  const [createModal, setCreateModal] = useState(false);

  return (
    <>
      {<CreateAppModal isOpen={createModal} setIsOpen={setCreateModal} />}
      <div className="flex items-center justify-between mb-6">
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
