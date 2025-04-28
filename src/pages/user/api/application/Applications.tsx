import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { useFetchApps } from "@/hooks/apps";
import { CopyIcon, TrashIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
// import moment from "moment";
import toast from "react-hot-toast";
import { useState } from "react";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CreateAppModal from "@/components/api/modal/CreateAppModal";
import DeleteAppModal from "@/components/api/modal/DeleteAppModal";
import Loader from "@/components/api/Loader";
import EmptyState from "@/components/api/EmptyState";
import { application } from "@/lib/placeholder";
import ToggleAPIEnv from "@/components/ToggleAPIEvn";

interface App {
  companyId: string;
  createdAt: string;
  id: string;
  name: string;
  public_key: string;
  private_key: string;
  status: boolean;
  logs: any[];
}
export default function Applications() {
  const navigate = useNavigate();
  const handleNavigate = (
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    app: App
  ) => {
    const el = e.target as HTMLElement;
    if (el.tagName === "SPAN") return;

    navigate(`${app.id}/logs`);
  };

  const [createModal, setCreateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  // const { isLoading, isFetching, data: apps } = useFetchApps();
  const { isLoading, isFetching, data: apps } = application;

  const copyAppId = (appId: string) => {
    navigator.clipboard
      .writeText(appId)
      .then(() => toast.success("Application ID copied", { id: "copyToast" }))
      .catch(() =>
        toast.error("Unable to copy application ID", { id: "copyToast" })
      );
  };

  const [appToDelete, setAppToDelete] = useState<App | null>(null);

  const handleDelete = (app: App) => {
    setAppToDelete(app);
    setDeleteModal(true);
  };

  return (
    <>
      {<CreateAppModal isOpen={createModal} setIsOpen={setCreateModal} />}
      {
        <DeleteAppModal
          isOpen={deleteModal}
          setIsOpen={setDeleteModal}
          applicationName={appToDelete?.name as string}
          appId={appToDelete?.id as string}
        />
      }
      <div className="flex items-center justify-between mb-16">
        <div className="flex items-center gap-5">
          <h2 className="text-xl font-semibold">Applications</h2>
          <div>
            {/* {company?.isVerified ? (
              <div className="px-2 py-0.5 rounded-full bg-green-200 text-[10px] font-medium cursor-pointer">
                LIVE
              </div>
            ) : (
              <div className="px-2 py-0.5 rounded-full bg-red-200 text-[10px] font-medium cursor-pointer">
                SANDBOX
              </div>
            )} */}
            <ToggleAPIEnv />
          </div>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setCreateModal(true)}>
          Create New App
        </Button>
      </div>

      <div className="bg-white rounded-xl overflow-hidden">
        {isLoading || isFetching ? (
          <Loader />
        ) : apps?.length < 1 ? (
          <EmptyState />
        ) : (
          <Table>
            <TableHeader className="bg-gray-500 h-10">
              <TableRow>
                <TableHead className="text-white">App Name</TableHead>
                <TableHead className="text-white">App ID</TableHead>
                <TableHead className="text-white">Date Created</TableHead>
                <TableHead className="text-white">Logs</TableHead>
                <TableHead className="text-white">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apps?.map((app: App, idx: number) => (
                <TableRow key={idx} onClick={(e) => handleNavigate(e, app)}>
                  <TableCell>{app.name}</TableCell>
                  <TableCell>
                    <TooltipProvider>
                      <Tooltip delayDuration={0}>
                        <TooltipTrigger>
                          <div className="flex items-center gap-6">
                            {app.id}
                            <span
                              className="flex w-max rounded-sm p-2 cursor-pointer hover:bg-gray-200"
                              onClick={() => copyAppId(app.id)}
                            >
                              <CopyIcon className="pointer-events-none" />
                            </span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-[200px]" side="bottom">
                          <p>Copy Application ID</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell>
                    {/* {moment(app.createdAt).format("DD/MM/YYYY, HH:MM A")} */}
                    {app.createdAt}
                  </TableCell>
                  <TableCell>{app.logs.length}</TableCell>
                  <TableCell>
                    <TooltipProvider>
                      <Tooltip delayDuration={0}>
                        <TooltipTrigger>
                          <span
                            className="flex w-max rounded-sm p-2 cursor-pointer hover:bg-red-300"
                            onClick={() => handleDelete(app)}
                          >
                            <TrashIcon className="pointer-events-none" />
                          </span>
                        </TooltipTrigger>
                        <TooltipContent
                          className="max-w-[200px] border-red-500"
                          side="bottom"
                        >
                          <p className="text-red-500">Delete Application</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </>
  );
}
