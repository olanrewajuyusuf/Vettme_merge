import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { MixerVerticalIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { VerificationSkeleton } from "@/components/SkeletonUi";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { usePagination } from "@/hooks/usePagination";
import Pagination from "@/components/pagination";
import { useFetchAddresses } from "@/hooks/company";
import { baseUrl } from "@/api/baseUrl";
import { Button } from "@/components/ui/button";
import { FaFileDownload } from "react-icons/fa";
import toast from "react-hot-toast";

interface AddressesProps {
    id: string,
    personnelName: string,
    personnelType: string,
    country: string,
    state: string,
    lga: string,
    address: string,
    status: string,
}

const Addresses = () => {
    const [addresses, setAddresses] = useState<AddressesProps[] | null>(null);
    const { fetchAddresses } = useFetchAddresses();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState("");
    const filter = searchParams.get("filter") || "all";
    const token = localStorage.getItem("token");
    const {id} = useParams();

    useEffect(() => {
        const getAddresses = async () => {
            if (!id) {
                // If id is undefined, don't attempt to fetch data
                setError("ID is missing");
                setLoading(false);
                return;
            }
    
            try {
                setLoading(true); // Set loading before fetching
                const data = await fetchAddresses(id); // Now `id` is guaranteed to be a string
                setAddresses(data.data);
            } catch (error) {
                console.error("Failed to fetch company info:", error);
                setError("Failed to fetch Addresses");
            } finally {
                setLoading(false);
            }
        };
    
        getAddresses();
    }, [id, fetchAddresses]); // Add `id` to dependency array
    

    // Handle Filter Change
    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedFilter = event.target.value;
        setSearchParams({ filter: selectedFilter });
    };

    // Filter Addresses
    const filteredAddresses = addresses
        ? addresses
            .filter((address) => {
                const query = searchQuery.toLowerCase();
                return (
                    address.personnelName.toLowerCase().includes(query) ||
                    address.country.toLowerCase().includes(query) ||
                    address.state.toLowerCase().includes(query) ||
                    address.lga.toLowerCase().includes(query)
                );
            })
            .filter((batch) =>
                filter === "pending" ? batch.status === "PENDING" :
                filter === "failed" ? batch.status === "FAILED" :
                filter === "submitted" ? batch.status === "SUBMITTED" :
                filter === "in_progress" ? batch.status === "INPROGRESS" :
                filter === "verified" ? batch.status === "VERIFIED" :
                true
            )
        : null;

    const noAddressMessage =
        filteredAddresses && filteredAddresses.length === 0
            ? filter === "Submitted"
                ? "You have no submitted Address."
                : filter === "pending"
                ? "You have no pending Address."
                : filter === "in_progress"
                ? "You have no In progress Address."
                : filter === "verified"
                ? "You have no verified Address."
                : filter === "failed"
                ? "You have no failed Address."
                : "No processing Address."
            : null;

    const { currentPage, totalPages, paginatedData, handlePageChange } = usePagination(filteredAddresses);

    // Download verification details into excel sheet
    const downloadExcel = async () => {
        try {
            const response = await fetch(`${baseUrl}/address-verification/download`, {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ formId: id }),
            });
    
            if (!response.ok) {
                throw new Error("Failed to download file");
            }
    
            // Convert response to a Blob (binary large object)
            const blob = await response.blob();
        
            // Create a temporary URL for the Blob
            const url = window.URL.createObjectURL(blob);
        
            // Create an invisible link element and trigger the download
            const a = document.createElement("a");
            a.href = url;
            a.download = "address_verifications.xlsx"; // File name
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url); // Clean up memory
            toast.success("File downloaded successfully!");
        } catch (error) {
            toast.error("Error downloading file. Please try again.");
            console.error("Error downloading file:", error);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-start mb-10">
                <div>
                    <h1 className="font-normal">Physical Address Verification</h1>
                    <p>Manage all your physical address verifications here.</p>
                </div>
                <div className="w-[200px] bg-white p-3 rounded-md border border-stroke-clr">
                    <p>Download the verified Addresses bellow.</p>
                    <Button
                        onClick={() => downloadExcel()}
                        className="blue-blue-gradient text-white font-bold py-2 px-4 rounded mt-3 flex items-center gap-1"
                    >
                        <FaFileDownload />
                        Download
                    </Button>
                </div>
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
                            <option value="submitted">Submitted</option>
                            <option value="verified">Verified</option>
                            <option value="failed">Failed</option>
                        </select>
                    </div>
                    <div className="relative w-[33%]">
                        <Input
                            type="text"
                            value={searchQuery} 
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="max-w-sm"
                            placeholder="Search by name, country, state, or LGA"
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
                {noAddressMessage && (
                    <div className="w-full h-[300px] flex justify-center items-center">
                        <h3>{noAddressMessage}</h3>
                    </div>
                )}

                {/* Table of Addresses */}
                {paginatedData && paginatedData.length > 0 && (
                <>
                    <Table>
                        <TableHeader className="bg-blue-700 h-8">
                            <TableRow>
                                <TableHead className="text-white">#</TableHead>
                                <TableHead className="text-white">Name</TableHead>
                                <TableHead className="text-white">Type</TableHead>
                                <TableHead className="text-white">Country</TableHead>
                                <TableHead className="text-white">State</TableHead>
                                <TableHead className="text-white">LGA</TableHead>
                                <TableHead className="text-white">Address</TableHead>
                                <TableHead className="text-white">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedData.map((address) => (
                                <TableRow
                                    key={address.id}
                                    
                                >
                                    <TableCell>
                                      <div 
                                      className={`
                                        w-7 h-7 grid place-items-center text-white uppercase rounded-sm ${address.personnelType === "guarantor" ? "bg-blue-500" : "bg-purple-600"}
                                      `}
                                      >
                                        {address.personnelName.slice(0, 2)}
                                      </div>
                                    </TableCell>
                                    <TableCell>{address.personnelName}</TableCell>
                                    <TableCell className={`${address.personnelType === "guarantor" ? "text-blue-500" : "text-purple-600"}`}>
                                        <MixerVerticalIcon /><span>{address.personnelType}</span>
                                    </TableCell>
                                    <TableCell className="text-gray-400">{address.country}</TableCell>
                                    <TableCell className="text-gray-400">{address.state}</TableCell>
                                    <TableCell className="text-gray-400">{address.lga}</TableCell>
                                    <TableCell className="text-gray-400">{address.address}</TableCell>
                                    <TableCell>
                                        <Badge className={`pointer-events-none 
                                            ${
                                            address.status === "VERIFIED" 
                                            ? "bg-green-400" 
                                            : address.status === "PENDING" 
                                            ? "border-yellow-500 border-[1px] text-yellow-500 bg-transparent" 
                                            : address.status === "SUBMITTED"
                                            ? "bg-blue-500"
                                            : address.status === "FAILED" 
                                            ? "bg-red-500" 
                                            : "bg-orange-400"
                                            }
                                            `}>
                                            {address.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                {/* Pagination Controls */}
                <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange}/>
                </>)}
            </div>
        </div>
    );
}

export default Addresses;
