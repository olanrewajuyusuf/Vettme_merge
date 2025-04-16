import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useFetchVerificationBatches } from "@/hooks/backOffice";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import moment from "moment";
import { VerificationSkeleton } from "@/components/SkeletonUi";
import { usePagination } from "@/hooks/usePagination";
import Pagination from "@/components/pagination";
  
  interface BatchesProps {
    id: string,
    title: string,
    max: number,
    status: string,
    verificationType: string,
    createdAt: string,
    expiryDate: string,
  }
  
  export default function Batches() {
    const { id } = useParams();
    const { fetchVerificationBatches } = useFetchVerificationBatches(id);
    const [ getBatches, setGetBatches ] = useState<BatchesProps[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState("");
    const filter = searchParams.get("filter") || "all";
    const navigate = useNavigate();
  
    useEffect(() => {
      const getBatchesInfo = async () => {
        try {
          const data = await fetchVerificationBatches();
            setGetBatches(data.data);
        } catch (error) {
          console.error("Failed to fetch company info:", error);
          setError("Can not fetch verification batches")
        } finally {
          setLoading(false);
        }
      };
  
      getBatchesInfo();
    }, [fetchVerificationBatches, id]);

    // Handle Filter Change
    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedFilter = event.target.value;
      setSearchParams({ filter: selectedFilter });
    };

    // Filter Addresses
    const filteredBatches = getBatches
      ? getBatches
          .filter((batch) => {
              const query = searchQuery.toLowerCase();
              return (
                  batch.title.toLowerCase().includes(query)
              );
          })
          .filter((batch) =>
            filter === "pending" ? batch.status === "PENDING" :
            filter === "failed" ? batch.status === "FAILED" :
            filter === "completed" ? batch.status === "COMPLETED" :
            filter === "in_progress" ? batch.status === "INPROGRESS" :
            true
          )
      : null;

    const noBatchesMessage =
      filteredBatches && filteredBatches.length === 0
        ? filter === "completed"
        ? "You have no completed Verification."
        : filter === "pending"
        ? "You have no pending Verification."
        : filter === "in_progress"
        ? "You have no In progress Verification."
        : filter === "failed"
        ? "You have no failed Verification."
        : "No processing Verification."
    : null;

    //Pagination Logic
    const { currentPage, totalPages, paginatedData, handlePageChange } = usePagination(filteredBatches);
        
    return (
      <>
        <div className="mb-10">
            <h1 className="font-normal">All Verification Batches</h1>
            <p>This is where you get all batches being process by this company</p>
        </div>
        <div className="w-full bg-white rounded-xl border-[1px] border-stroke-clr overflow-hidden">
            {/* Filter and Search */}
            <div className="flex justify-between items-center py-4 border-b-[1px] border-stroke-clr px-5">
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
              <div className="relative w-[33%]">
                  <Input
                      type="text"
                      value={searchQuery} 
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="max-w-sm"
                      placeholder="Search by Title or Type"
                  />
                  <SearchIcon className="text-stroke-clr absolute right-3 top-1/2 -translate-y-1/2" />
              </div>
          </div>
          
          {/* Loading, Error, and No Data States */}
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
                <TableHead>Personnels</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date Initiated</TableHead>
                <TableHead>Exp Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((batch: BatchesProps) => (
                <TableRow
                 key={batch.id} 
                 onClick={() => navigate(`personnels/${batch.id}`)}
                 >
                  <TableCell className=" font-medium uppercase flex items-center gap-2">
                    <div className={`w-6 h-6 grid place-items-center text-white rounded-sm bg-purple-600`}>
                        {batch.title.slice(0, 2)}
                    </div>
                    <span>{batch.title}</span>
                  </TableCell>
                  <TableCell>{batch.max}</TableCell>
                  <TableCell>
                    <Badge
                      className={`pointer-events-none ${
                        batch.status === "COMPLETED"
                          ? "bg-green-400"
                          : batch.status === "PENDING"
                          ? "border-yellow-500 border-[1px] text-yellow-500 bg-transparent"
                          : batch.status === "FAILED"
                          ? "bg-red-500"
                          : "bg-orange-400"
                      }`}
                    >
                      {batch.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{batch.verificationType}</TableCell>
                  <TableCell>{moment(batch.createdAt).format("MMM DD, YYYY")}</TableCell>
                  <TableCell>{moment(batch.expiryDate).format("MMM DD, YYYY")}</TableCell>
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
  