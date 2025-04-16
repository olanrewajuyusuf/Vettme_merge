import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ClipboardIcon } from "@radix-ui/react-icons"; //, TrashIcon useNavigate
import { Input } from "@/components/ui/input";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFetchBatches } from "@/hooks/company";
import { Badge } from "@/components/ui/badge";
import moment from "moment";
import { VerificationSkeleton } from "@/components/SkeletonUi";
import { usePagination } from "@/hooks/usePagination";
import Pagination from "@/components/pagination";

interface BatchesProps {
  id: string,
  title: string,
  status: string,
  createdAt: string,
  expiryDate: string,
  max: string,
}

export default function Verifications() {
  const [ batches, setBatches ] = useState<BatchesProps[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { fetchBatches } = useFetchBatches();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get("filter") || "all";

  useEffect(() => {
    const getBatches = async () => {
      try {
        const data = await fetchBatches();
        setBatches(data.data);
      } catch (error) {
        console.error("Failed to fetch Verification batches:", error);
        setError("Failed to fetch Verification batches");
      } finally {
        setLoading(false);
      }
    };

    getBatches();
  }, [fetchBatches]);  

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFilter = event.target.value;
    setSearchParams({ filter: selectedFilter });
  };

  const filteredBatches = batches
    ? filter === "pending"
      ? batches.filter((batch) => batch.status === "PENDING")
      : filter === "failed"
      ? batches.filter((batch) => batch.status === "FAILED")
      : filter === "completed"
      ? batches.filter((batch) => batch.status === "COMPLETED")
      : filter === "in_progress"
      ? batches.filter((batch) => batch.status === "INPROGRESS")
      : batches
    : null;

  const noBatchesMessage =
    filteredBatches && filteredBatches.length === 0
      ? filter === "completed"
        ? "You have no completed verification batch."
        : filter === "pending"
        ? "You have no pending verification batch."
        : filter === "in_progress"
        ? "You have no ungoing verification batch."
        : filter === "failed"
        ? "You have no failed verification batch."
        : "No Verification Batch available."
      : null;

  //Pagination Logic
  const { currentPage, totalPages, paginatedData, handlePageChange } = usePagination(filteredBatches);  

  return (
    <>
      <div className="mb-[30px] flex justify-between items-center">
        <div>
          <h2>Verifications</h2>
          <p className="text-sm">All your verifications in one place</p>
        </div>
        <Link to="/pro/verifications/new">
          <Button className="gap-2 red-gradient">
            <ClipboardIcon /> Start New Verification
          </Button>
        </Link>
      </div>

      <div className="w-full bg-white rounded-xl border-[1px] border-stroke-clr overflow-hidden">
        <div className="w-full py-4 flex justify-between items-center border-b-[1px] border-stroke-clr px-5">
          <div className="flex items-center gap-3">
            <p>Filter by: </p>
            <select
              name="filter"
              id="filter"
              className="btn px-3"
              value={filter}
              onChange={handleFilterChange}
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
            </select>
          </div>
          <Input
            type="text"
            placeholder="Search by verification title"
            className="max-w-sm"
          />
        </div>

        {loading && (
          <div className="flex flex-col gap-3">
            <VerificationSkeleton />
            <VerificationSkeleton />
            <VerificationSkeleton />
          </div>
        )}
        {error && (
          <div className="w-full h-[300px] flex justify-center items-center">
            <h3>{error}</h3>
          </div>
        )}
        {noBatchesMessage && (
          <div className="w-full h-[300px] flex justify-center items-center">
            <h3>{noBatchesMessage}</h3>
          </div>
        )}
        {paginatedData && paginatedData.length > 0 && (
        <>
        <Table>
          <TableHeader className="bg-stroke-clr">
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>No of Personnel</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date Created</TableHead>
              <TableHead>Exp Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData?.map((item) => (
              <TableRow 
                key={item.id} 
                onClick={() => navigate(item.id)}
              >
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell>{item.max}</TableCell>
                <TableCell>
                  <Badge
                    className={`pointer-events-none ${
                      item.status === "COMPLETED"
                        ? "bg-green-400"
                        : item.status === "PENDING"
                        ? "border-yellow-500 border-[1px] text-yellow-500 bg-transparent"
                        : item.status === "FAILED"
                        ? "bg-red-500"
                        : "bg-orange-400"
                    }`}
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>{moment(item.createdAt).format("MMM DD, YYYY")}</TableCell>
                <TableCell>{moment(item.expiryDate).format("MMM DD, YYYY")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination Controls */}
        <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange}/>
        </>)}
      </div>
    </>
  );
}
