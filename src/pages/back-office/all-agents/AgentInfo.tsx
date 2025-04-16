import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import loader from "@/assets/loader.svg";
import { useAssignAddress, useFetchAddresses, useFetchAgents, useFetchAssignedAddress } from "@/hooks/backOffice";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AvatarIcon, CheckCircledIcon, CrossCircledIcon, GlobeIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { VerificationSkeleton } from "@/components/SkeletonUi";
  
  interface AgentProps {
    agentName: string;
    email: string;
    address: string;
    lga: string;
    state: string;
    accessCode: string;
  }
  
  interface addressesProps {
    id: string;
    personnelName: string;
    personnelType: string;
    country: string;
    state: string;
    lga: string;
    address: string;
    status: string;
  }
  
  const AgentInfo = () => {
    const [checked, setChecked] = useState<string[]>([]);
    const [agent, setAgent] = useState<AgentProps | null>(null);
    const [pendingAddresses, setPendingAddresses] = useState<addressesProps[] | null>(null);
    const [assignedAddresses, setAssignedAddresses] = useState<addressesProps[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { fetchAddresses } = useFetchAddresses();
    const { fetchAgents } = useFetchAgents();
    const { fetchAssignedAddress } = useFetchAssignedAddress();
    const { assignAddress } = useAssignAddress();
    const [searchQuery, setSearchQuery] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();
  
    useEffect(() => {
      const getAgents = async () => {
        try {
          const data = await fetchAgents();
          const singleAgent = data.result.filter((item: any) => item.id === id);
          setAgent(singleAgent[0]);
        } catch (error) {
          console.error("Failed to fetch Field Agent:", error);
        }
      };
  
      const getAddresses = async () => {
        try {
          const data = await fetchAddresses();
          const addresses = data.data.filter((item: any) => item.status === 'PENDING');          
          setPendingAddresses(addresses);
        } catch (error) {
          console.error("Failed to fetch pending addresses:", error);
          setError("Failed to fetch addresses");
        } finally {
          setLoading(false);
        }
      };

      const getAssignedAddresses = async () => {
        try {
          const data = await fetchAssignedAddress(id as string);
          setAssignedAddresses(data.data);
        } catch (error) {
          console.error("Failed to fetch assigned addresses:", error);
        }
      };
  
      getAgents();
      getAddresses();
      getAssignedAddresses();
    }, [fetchAgents, id, fetchAddresses, fetchAssignedAddress]); 
    
    const filteredAddresses = pendingAddresses
        ? pendingAddresses
            .filter((address) => {
                const query = searchQuery.toLowerCase();
                return (
                    address.country.toLowerCase().includes(query) ||
                    address.state.toLowerCase().includes(query) ||
                    address.lga.toLowerCase().includes(query)
                );
            })
        : null;

    const noAddressMessage =
        filteredAddresses && filteredAddresses.length === 0
        ? `No State or LGA match ${searchQuery}...`
        : null;
  
    // Toggling checked addresses
    const toggleChecked = (id: string) => {
      setChecked((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    };
  
    // Submit form function
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const data = {fieldAgentId: id, addressIds: checked}
      console.log(data);
      
      try {
        await assignAddress(data);
        // Update unassigned addresses
        const updatedAddress = await fetchAddresses();
        const addresses = updatedAddress.data.filter((item: any) => item.status === 'PENDING');          
        setPendingAddresses(addresses);

        // Update unassigned addresses
        const updatedAssignedAddress = await fetchAssignedAddress(id as string);
        setAssignedAddresses(updatedAssignedAddress.data);
      } catch (error: any) {
          console.error("Failed to assign address(es):", error.message);
      }
    };
      
    return (
      <>
        <div className="grid grid-cols-3 gap-5">
            <div className="bg-[#ffffffaa] p-5 rounded-lg">
              <AvatarIcon className="text-destructive mb-3" />
                <ul>
                  <li className="flex flex-col justify-center border-b-[1px] mb-3 pb-2">
                    <span className="text-blue-500 font-bold text-sm">Agent</span>
                    <span className="text-sm">{agent?.agentName}</span>
                  </li>
                  <li className="flex flex-col justify-center border-b-[1px] mb-3 pb-2">
                    <span className="text-blue-500 font-bold text-sm">Email</span>
                    <span className="text-sm">{agent?.email}</span>
                  </li>
                  <li className="flex flex-col justify-center border-b-[1px] mb-3 pb-2">
                    <span className="text-blue-500 font-bold text-sm">Access Code</span>
                    <span className="text-sm">{agent?.accessCode}</span>
                  </li>
                  <li className="flex flex-col justify-center border-b-[1px] mb-3 pb-2">
                    <span className="text-blue-500 font-bold text-sm">State</span>
                    <span className="text-sm">{agent?.state}</span>
                  </li>
                  <li className="flex flex-col justify-center border-b-[1px] mb-3 pb-2">
                    <span className="text-blue-500 font-bold text-sm">LGA</span>
                    <span className="text-sm">{agent?.lga}</span>
                  </li>
                  <li className="flex flex-col justify-center">
                    <span className="text-blue-500 font-bold text-sm">Home Address</span>
                    <span className="text-sm">{agent?.address}</span>
                  </li>
                </ul>
            </div>
            <div className="bg-white p-5 rounded-lg col-span-2 h-[420px]">
              <h3 className="mb-5 flex items-center gap-1"><GlobeIcon className="text-purple-500"/>All assigned Address(es)</h3>
                {assignedAddresses === null ? (
                  <div className="w-full h-[300px] flex items-center justify-center">
                    <img src={loader} alt="Loading" className="w-10" />
                  </div>
                ) : assignedAddresses?.length === 0 ? (
                  <div className="w-full h-[300px] flex justify-center items-center">
                    <h3>No assigned address(es).</h3>
                  </div>
                ) : (
                <div className="h-[340px] overflow-y-scroll  rounded-lg overflow-hidden">
                <Table>
                  <TableHeader className="bg-blue-700">
                    <TableRow>
                      <TableHead></TableHead>
                      <TableHead className="text-white"></TableHead>
                      <TableHead className="text-white">Address</TableHead>
                      <TableHead className="text-white">State</TableHead>
                      <TableHead className="text-white">LGA</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assignedAddresses?.map((item) => (
                      <TableRow key={item.id} onClick={()=> navigate('/back-office/all-addresses/address-detail/' + item.id)}>
                        <TableCell >
                          <div className="bg-blue-500 w-7 h-7 grid place-items-center text-white rounded-full">
                            {item.personnelName.slice(0, 1)}
                          </div>
                        </TableCell>
                        <TableCell>{item.personnelName}</TableCell>
                        <TableCell>{item.address}</TableCell>
                        <TableCell>{item.state}</TableCell>
                        <TableCell>{item.lga}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                </div>
              )}
            </div>
        </div>

        <form onSubmit={handleSubmit}>
            <div className="bg-white p-5 rounded-lg mt-5">
              <p className="border-b pb-3 mb-3">These are Unassigned addresses you can filter by searching for the state or lga that aligned with the Agent's location.</p>
                <div className="flex justify-between items-center pb-3 border-b-[1px] border-gray-200">
                <div className="relative">
                    <Input
                        type="text"
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by State or lga"
                        className="max-w-sm"
                    />
                    <SearchIcon className="text-stroke-clr absolute right-3 top-1/2 -translate-y-1/2" />
                  </div>
                    <Button type="submit" className="red-gradient">Submit</Button>
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
                {filteredAddresses && filteredAddresses.length > 0 && (
                <div className="h-[300px] overflow-y-scroll">
                <Table>
                  <TableHeader className="bg-blue-700">
                    <TableRow>
                      <TableHead></TableHead>
                      <TableHead className="text-white">Address</TableHead>
                      <TableHead className="text-white">State</TableHead>
                      <TableHead className="text-white">LGA</TableHead>
                      <TableHead className="text-white">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAddresses?.map((item) => (
                      <TableRow key={item.id} onClick={() => toggleChecked(item.id)}>
                        <TableCell>
                          <input
                            type="checkbox"
                            checked={checked.includes(item.id)}
                            className="hidden"
                            readOnly
                          />
                          {checked.includes(item.id) ? (
                            <CheckCircledIcon className="text-blue-500" />
                          ) : (
                            <CrossCircledIcon className="text-destructive" />
                          )}
                        </TableCell>
                        <TableCell>{item.address}</TableCell>
                        <TableCell>{item.state}</TableCell>
                        <TableCell>{item.lga}</TableCell>
                        <TableCell>{item.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                </div>
              )}
            </div>
          </form>
      </>
    );
  };
  
  export default AgentInfo;
  