import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Loader from "./Loader";
import moment from "moment";
import EmptyState from "./EmptyState";
import { activities } from "@/lib/placeholder";

// import { useFetchRecentActivities } from "@/hooks/apps";

interface RecentActivityProp {
  applicationName: string;
  applicationId: string;
  cost: string;
  date: string;
  environment: string;
  service: string;
  status: string;
}

export default function DashboardRecent() {
  // const {
  //   isLoading,
  //   isFetching,
  //   data: recentActivites,
  // } = useFetchRecentActivities();
  const {
    isLoading,
    isFetching,
    data: recentActivites,
  } = activities;

  return (
    <div className="bg-white rounded-xl overflow-hidden">
      {isLoading || isFetching ? (
        <Loader />
      ) : recentActivites?.length > 0 ? (
        <Table>
          <TableHeader className="bg-gray-500">
            <TableRow>
              <TableHead className="text-white">App Name</TableHead>
              <TableHead className="text-white">Service</TableHead>
              <TableHead className="text-white">Environment</TableHead>
              <TableHead className="text-white">Date Called</TableHead>
              <TableHead className="text-white">Cost</TableHead>
              <TableHead className="text-white">Status Code</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentActivites
              ?.slice(0, 10)
              ?.map((item: RecentActivityProp, idx: number) => (
                <TableRow key={idx}>
                  <TableCell>{item.applicationName}</TableCell>
                  <TableCell>{item.service}</TableCell>
                  <TableCell>{item.environment}</TableCell>
                  <TableCell>
                    {moment(item.date).format("DD/MM/YYYY, HH:MM A")}
                  </TableCell>
                  <TableCell>{item.cost}</TableCell>
                  <TableCell>
                    <span
                      className={`${
                        parseInt(item.status) <= 200
                          ? "bg-green-200"
                          : parseInt(item.status) <= 300
                          ? "bg-yellow-200"
                          : "bg-red-200"
                      } flex items-center justify-center w-max rounded-full px-3 py-1 text-xs`}
                    >
                      {item.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}
