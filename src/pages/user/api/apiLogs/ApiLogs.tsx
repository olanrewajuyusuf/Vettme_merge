import { Button } from "@/components/ui/button";
import {
  CheckCircledIcon,
  CopyIcon,
  CrossCircledIcon,
  EyeOpenIcon,
  InfoCircledIcon,
  PieChartIcon,
  EyeNoneIcon,
} from "@radix-ui/react-icons";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { useFetchAppLogs } from "@/hooks/apps";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import moment from "moment";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { application } from "@/lib/placeholder";
import Loader from "@/components/api/Loader";
import EmptyState from "@/components/api/EmptyState";

interface Log {
  applicationId: string;
  applicationName: string;
  createdAt: string;
  id: string;
  service: string;
  statusCode: string;
  environment: string;
}

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

export default function ApiLogs() {
  const { appId } = useParams();

  const [privateKeyHidden, setPrivateKeyHidden] = useState(true);

  // const { isLoading, isFetching, data } = useFetchAppLogs(appId!);
  const { isLoading, isFetching, data } = application;
  
  // const app = data?.app;
  const app = data?.find((app: App) => app.id === appId);

  // const logs = data?.logs;
  const logs = app?.logs;

  const copyPrivateKey = () => {
    navigator.clipboard
      .writeText(app?.private_key as string)
      .then(() =>
        toast.success("Application private key copied", { id: "copyToast" })
      )
      .catch(() =>
        toast.error("Unable to copy application ID", { id: "copyToast" })
      );
  };

  const copyPublicKey = () => {
    navigator.clipboard
      .writeText(app?.public_key as string)
      .then(() =>
        toast.success("Application public key copied", { id: "copyToast" })
      )
      .catch(() =>
        toast.error("Unable to copy application ID", { id: "copyToast" })
      );
  };

  const cards = [
    {
      qty: logs?.length || 0,
      text: "Total API calls",
      color: "blue",
      icon: <PieChartIcon />,
    },
    {
      qty:
        logs?.filter((log: Log) => parseInt(log.statusCode) < 301).length || 0,
      text: "Successful API calls",
      color: "green",
      icon: <CheckCircledIcon />,
    },
    {
      qty:
        logs?.filter((log: Log) => parseInt(log.statusCode) > 301).length || 0,
      text: "Failed API calls",
      color: "red",
      icon: <CrossCircledIcon />,
    },
  ];

  const itemsPerPage = 10;
  const location = useLocation();
  const navigate = useNavigate();

  // Get current page from URL, defaulting to 1 if not present
  const currentPage = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const page = parseInt(params.get("page") || "1", 10);
    return page > 0 ? page : 1;
  }, [location.search]);

  // Calculate total pages and paginated data
  const totalPages = Math.ceil(logs?.length as number / itemsPerPage);
  const paginatedData = useMemo(
    () =>
      logs?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
    [logs, currentPage, itemsPerPage]
  );

  // Handle page change by updating URL
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(location.search);
    params.set("page", page.toString());
    navigate({ search: params.toString() });
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">API Logs - {app?.name}</h2>

        <Button size="default">Export</Button>
      </div>

      <div className="grid grid-cols-3 ww-full gap-6 mb-6">
        {cards.map((item, idx) => (
          <Card
            icon={item.icon}
            text={item.text}
            qty={item.qty}
            color={item.color}
            key={idx}
          />
        ))}
      </div>

      <div className="w-full bg-white rounded-xl py-4 px-10 mb-6 flex border-[1px]">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="text-xs text-gray-500">Public key</p>
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <span className="flex w-max rounded-sm p-0.5 cursor-pointer hover:bg-gray-100">
                    <InfoCircledIcon className="pointer-events-none scale-[80%]" />
                  </span>
                </TooltipTrigger>
                <TooltipContent className="max-w-[200px]" side="bottom">
                  <p>
                    This is your public key. Use your public key to call the
                    sandbox api.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center gap-3">
            <p>{app?.public_key}</p>
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <span
                    className="flex w-max rounded-sm p-2 cursor-pointer hover:bg-gray-100"
                    onClick={copyPublicKey}
                  >
                    <CopyIcon className="pointer-events-none" />
                  </span>
                </TooltipTrigger>
                <TooltipContent className="max-w-[200px]" side="bottom">
                  <p>Copy public api key</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="text-xs text-gray-500">Private key</p>
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <span className="flex w-max rounded-sm p-0.5 cursor-pointer hover:bg-gray-100">
                    <InfoCircledIcon className="pointer-events-none scale-[80%]" />
                  </span>
                </TooltipTrigger>
                <TooltipContent className="max-w-[200px]" side="bottom">
                  <p>
                    This is your private/secret key. Use your private key to
                    call the live api. Do not share your secret key with anyone.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center gap-3">
            <p>
              {privateKeyHidden
                ? app?.private_key.slice(0, 12) + "******************"
                : app?.private_key}
            </p>
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <span
                    className="flex w-max rounded-sm p-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => setPrivateKeyHidden((prev) => !prev)}
                  >
                    {privateKeyHidden ? (
                      <EyeOpenIcon className="pointer-events-none" />
                    ) : (
                      <EyeNoneIcon className="pointer-events-none" />
                    )}
                  </span>
                </TooltipTrigger>
                <TooltipContent className="max-w-[200px]" side="bottom">
                  <p>
                    {!privateKeyHidden
                      ? "Hide private key"
                      : "Unmask private key."}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <span
                    className="flex w-max rounded-sm p-2 cursor-pointer hover:bg-gray-100"
                    onClick={copyPrivateKey}
                  >
                    <CopyIcon className="pointer-events-none" />
                  </span>
                </TooltipTrigger>
                <TooltipContent className="max-w-[200px]" side="bottom">
                  <p>Copy private api key</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl overflow-hidden">
        {isLoading || isFetching ? (
          <Loader />
        ) : paginatedData?.length as number > 0 ? (
          <Table>
            <TableHeader className="bg-gray-500">
              <TableRow>
                <TableHead className="text-white">App Name</TableHead>
                <TableHead className="text-white">Service</TableHead>
                <TableHead className="text-white">Environment</TableHead>
                <TableHead className="text-white">Date Called</TableHead>
                <TableHead className="text-white">Status Code</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData?.map((log: Log, idx: number) => (
                <TableRow key={idx}>
                  <TableCell>{log.applicationName}</TableCell>
                  <TableCell>{log.service}</TableCell>
                  <TableCell>{log.environment}</TableCell>
                  <TableCell>
                    {moment(log.createdAt).format("MMM DD, YYYY HH:MM A")}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`${
                        parseInt(log.statusCode) <= 200
                          ? "bg-green-200"
                          : parseInt(log.statusCode) <= 300
                          ? "bg-yellow-200"
                          : "bg-red-200"
                      } flex items-center justify-center w-max rounded-full px-3 py-1 text-xs`}
                    >
                      {log.statusCode}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter className="mt-3 w-full">
              <TableRow>
                <TableCell colSpan={5}>
                  <div className="flex items-center justify-center w-full gap-3">
                    <Button
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      variant="outline"
                    >
                      Previous
                    </Button>
                    <>
                      Page {currentPage} of {totalPages}
                    </>
                    <Button
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      variant="outline"
                    >
                      Next
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        ) : (
          <EmptyState />
        )}
      </div>
    </>
  );
}

const Card = ({
  icon,
  text,
  qty,
  color,
}: {
  text: string;
  icon: any;
  qty: number;
  color: string;
}) => (
  <div className="w-full rounded-xl bg-white p-6 flex items-center gap-6 border-[1px]">
    <span
      className={`w-10 h-10 rounded-full flex items-center justify-center aspect-square text-white ${
        color === "red"
          ? "bg-red-400"
          : color === "green"
          ? "bg-green-400"
          : "bg-blue-400"
      }`}
    >
      <span className="scale-150">{icon}</span>
    </span>
    <span>
      <p>{text}</p>
      <h1 className="text-3xl font-medium">{qty}</h1>
    </span>
  </div>
);
