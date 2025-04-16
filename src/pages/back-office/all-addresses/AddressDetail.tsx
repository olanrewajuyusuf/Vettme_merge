import { useAcceptAddress, useFetchAddress, useFetchAddresses, useRejectAddress } from "@/hooks/backOffice";
import moment from "moment";
import { TbWorldLatitude, TbWorldLongitude } from "react-icons/tb";
import { RiFolderVideoLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import loader from "@/assets/loader.svg";
import { useParams } from "react-router-dom";
import { IoIosPerson, IoIosTimer } from "react-icons/io";
import { FaAddressBook, FaCalendarCheck, FaLandmark } from "react-icons/fa";
import { FaBusSimple } from "react-icons/fa6";
import { TiInfoLarge } from "react-icons/ti";
import { calculateDistance, getAddressFromCoordinates, getCoordinatesFromAddress } from "@/lib/geolocation";
import { MdPeopleAlt } from "react-icons/md";

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

interface findingsProps {
    id: string,
    busStop: string,
    createdAt: string,
    landmark: string,
    initialLocation: any,
    finalLocation: any,
    video: string,
    status: string,
    confirmation: string,
}

const AddressDetail = () => {
    const [address, setAddress] = useState<addressesProps[] | null>(null);
    const [coordinates, setCoordinates] = useState<{
        lat: number;
        lon: number;
    } | null>(null);
    const [coordAddress, setCoordAddress] = useState<any | null>(null);
    const [findings, setFindings] = useState<findingsProps | null>(null);
    const [agent, setAgent] = useState<any | null>(null);
    const [isVideo, setIsVideo] = useState(false);
    const [loading, setLoading] = useState(true);
    const [accepting, setAccepting] = useState(false);
    const [rejecting, setRejecting] = useState(false);
    const { fetchAddresses } = useFetchAddresses();
    const { fetchAddress } = useFetchAddress();
    const { acceptAddress } = useAcceptAddress();
    const { rejectAddress } = useRejectAddress();
    const { id } = useParams();

    useEffect(() => {
        const getAddress = async () => {
            try {
                const data = await fetchAddresses();
                const personnel = data.data.filter(
                (person: addressesProps) => person.id === id
                );
                setAddress(personnel);
            } catch (error) {
                console.error("Failed to fetch company info:", error);
            }
        };

        const getFindings = async () => {
            try {
                const data = await fetchAddress(id as string);
                setFindings(data.data.addressVerificationData);
                setAgent(data.data.agent);
            } catch (error) {
                console.error("Failed to fetch agent's findings:", error);
            } finally {
                setLoading(false);
            }
        };

        getAddress();
        getFindings();
    }, [fetchAddresses, id, fetchAddress]);

    useEffect(() => {
        const fetchCoordinates = async () => {
        const coords = await getCoordinatesFromAddress(
            address && address[0].address
        );
        if (coords) {
            setCoordinates(coords);
        }
        };

        fetchCoordinates();
    }, [address]);

    useEffect(() => {
        const fetchCoordsAddress = async () => {
        const coords = await getAddressFromCoordinates(
            findings?.initialLocation.lat || findings?.finalLocation.lat,
            findings?.initialLocation.lon || findings?.finalLocation.lon
        );
        if (coords) {
            setCoordAddress(coords);
        }
        };

        fetchCoordsAddress();
    }, [findings?.initialLocation.lat, findings?.initialLocation.lon, findings?.finalLocation.lon, findings?.finalLocation.lat]);

    const handleAccept = async () => {
        setAccepting(true);
        try {
            await acceptAddress(id as string);
        } catch (error: any) {
            console.error("Failed to accept the verdict:", error.message);
        } finally {
            setAccepting(false);
        }
    };

    const handleReject = async () => {
        setRejecting(true);
        try {
            await rejectAddress(id as string);
        } catch (error: any) {
            console.error("Failed to reject the verdict:", error.message);
        } finally {
            setRejecting(false);
        }
    };

    // Calculate distance
    const distance = calculateDistance(coordinates?.lat, coordinates?.lon, findings?.initialLocation.lat || findings?.finalLocation.lat, findings?.initialLocation.lon || findings?.finalLocation.lon);    

  return (
    <>
        <div className="border-[1px] border-stroke-clr bg-white rounded-lg grid grid-cols-3 gap-5">
            <div className="border-r-[1px] border-stroke-clr p-5">
                <h2>Claim</h2>
                {loading && (
                    <div className="w-full h-[200px] flex items-center justify-center">
                        <img src={loader} alt="Loading" className="w-10" />
                    </div>
                )}
                {(!loading && !address) && (
                <div className="h-[200px]">
                    <p className="text-center">Can't get claimed address</p>
                </div>)}
                {(!loading && address) && (
                <>
                <div className="flex flex-col justify-center items-center mb-5">
                    <div className="w-20 h-20 rounded-full text-white text-4xl bg-blue-500 grid place-items-center mb-3">{address && address[0].personnelName.slice(0, 2).toUpperCase()}</div>
                    <h3>{address && address[0].personnelName}</h3>
                </div>
                <div>
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 bg-blue-900 rounded-full grid place-items-center text-white text-2xl"><MdPeopleAlt /></div>
                        <div>
                            <p className="font-bold">Status</p>
                            <p>{address && address[0].personnelType}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-900 rounded-full grid place-items-center text-white text-xl"><FaAddressBook /></div>
                        <div className="w-[80%]">
                            <p className="font-bold">Address</p>
                            <p>{address && address[0].address}</p>
                        </div>
                    </div>
                </div>
                </>)}
            </div>
            <div className="col-span-2 p-5">
                <h2>Findings</h2>
                {loading && (
                    <div className="w-full h-[200px] flex items-center justify-center">
                        <img src={loader} alt="Loading" className="w-10" />
                    </div>
                )}
                {(!loading && !findings) && (
                <div className="h-[200px]">
                    <p className="text-center">No Agent's verification data or assigned</p>
                </div>)}
                {(!loading && findings) && (
                <>
                <div className="flex items-center gap-3 my-5">
                    <div className="w-10 h-10 bg-blue-900 rounded-full grid place-items-center text-white text-xl"><IoIosPerson /></div>
                    <div>
                        <p className="font-bold">Agent</p>
                        <p>{findings && agent.agentName}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 bg-blue-900 rounded-full grid place-items-center text-white text-xl"><FaLandmark /></div>
                    <div>
                        <p className="font-bold">Landmark</p>
                        <p>{findings?.landmark}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 bg-blue-900 rounded-full grid place-items-center text-white text-xl"><FaBusSimple /></div>
                    <div>
                        <p className="font-bold">Busstop</p>
                        <p>{findings?.busStop}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 bg-blue-900 rounded-full grid place-items-center text-white text-xl"><FaCalendarCheck /></div>
                    <div>
                        <p className="font-bold">Does this person live here?</p>
                        <p>{findings?.confirmation}</p>
                    </div>
                </div>
                {!isVideo && <div className="bg-blue-600 rounded-lg text-white p-3 mb-3 shadow-md">
                    <h3 className="mb-5">Recorded video</h3>
                    <button
                    onClick={() => setIsVideo(true)}
                    >
                        <span className="w-20 bg-white text-black p-2 rounded-full flex justify-center items-center gap-1">play <RiFolderVideoLine className="text-xl" /></span>
                    </button>
                </div>}
                {isVideo && <div className="relative">
                    {findings && (
                    <video width="320" height="240" controls>
                        <source src={findings && findings.video} type="video/mp4"/>
                    </video>)}
                    <button 
                    onClick={() => setIsVideo(false)}
                    className="absolute top-3 right-5 bg-destructive text-white px-2 rounded-full border-[1px] border-white"
                    >
                        close
                    </button>
                </div>}
                </>)}
            </div>
        </div>
        <div className="grid grid-cols-3 gap-5 my-5">
            <div className="col-span-2">
                <div className="bg-white rounded-lg border-[1px] border-stroke-clr">
                    {loading && (
                        <div className="w-full h-[200px] flex items-center justify-center">
                            <img src={loader} alt="Loading" className="w-10" />
                        </div>
                    )}
                    {(!loading && !findings) && (
                    <div className="h-[200px]">
                        <p className="text-center">Cant't fetch data</p>
                    </div>)}
                    {(!loading && findings) && (
                    <>
                    <div className="flex gap-5 p-5">
                        <table>
                            <tr className="text-left p-5">
                                <th className="w-1/2">Personnel's Claim</th>
                                <th className="w-1/2">Agent's Findings</th>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className="text-sm">{address && address[0].address}</td>
                                <td className="text-sm">{coordAddress}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <span className="flex items-center gap-2 text-sm">
                                        <TbWorldLongitude />Lon: {coordinates?.lon}
                                    </span>
                                </td>
                                <td>
                                    <span className="flex items-center gap-2 text-sm">
                                        <TbWorldLongitude />Lon: {findings?.initialLocation.lon || findings?.finalLocation.lon}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <span className="flex items-center gap-2 text-sm">
                                        <TbWorldLatitude />Lat: {coordinates?.lat}
                                    </span>
                                </td>
                                <td>
                                    <span className="flex items-center gap-2 text-sm">
                                        <TbWorldLatitude />Lat: {findings?.initialLocation.lat || findings?.finalLocation.lat}
                                    </span>
                                </td>
                            </tr>
                        </table>
                        <div>
                            <div className="mb-5">
                                <h3 className="font-bold">Threshold</h3>
                                <p>5km</p>
                            </div>
                            <div>
                                <h3 className="font-bold">Distance</h3>
                                <p>{distance.toFixed(2)}km</p>
                            </div>
                        </div>
                    </div>
                    <div className="border-t-[1px] border-stroke-clr px-5 py-2 flex justify-between items-center">
                        <div>
                            <span className="font-bold">Verdict:</span>
                            <span className={`text-sm ml-5 px-3 py-1 rounded-md
                                ${distance <= 5 ?
                                "bg-green-300 text-green-900" : "bg-red-300 text-red-700"}
                                `}>
                            {
                                distance <= 5 ?
                                "Within the threshold." : "Not within the threshold."
                            }
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <button 
                            onClick={() => handleAccept()}
                            className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-500 text-sm"
                            >
                                {accepting ? "Accepting..." : "Accept"}
                            </button>
                            <button
                            onClick={() => handleReject()}
                            className="bg-destructive text-white px-3 py-1 rounded-md hover:bg-red-400 text-sm"
                            >
                                {rejecting ? "Rejecting..." : "Reject"}
                            </button>
                        </div>
                    </div>
                    </>)}
                </div>
                <div className="flex mt-5 pr-10">
                    <span className="text-destructive text-3xl"><TiInfoLarge /></span>
                    <div>
                        <h3>Geolocation comparison</h3>
                        <p>
                        The claimed address latitude and longitude being compare in <b>km </b>
                        with the agent's starting location latitude and longitude with
                        threshold radius being set to <b>5km</b>.
                        </p>
                    </div>
                </div>
            </div>
            <div>
                <div className="bg-white rounded-lg p-3 mb-3 shadow-md">
                    <h3 className="mb-3">Starting Location</h3>
                    {loading && (
                    <div className="w-full h-[100px] flex items-center justify-center">
                        <img src={loader} alt="Loading" className="w-10" />
                    </div>
                    )}
                    {(!loading && !findings) && (
                    <div className="h-[100px]">
                        <p className="text-center">Can't find starting location</p>
                    </div>)}
                    {(!loading && findings) && (
                    <div>
                        <div className="mb-2 pb-2 flex justify-between items-center">
                            <span className="flex items-center gap-1 text-sm"><TbWorldLongitude />Longitude</span>
                            <span className="float-right text-xs">{findings?.initialLocation.lon}</span>
                        </div>
                        <div className="border-b border-stroke-clr mb-2 pb-2 flex justify-between items-center">
                            <span className="flex items-center gap-1 text-sm"><TbWorldLatitude />Latitude</span>
                            <span className="float-right text-xs">{findings?.initialLocation.lat}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="flex items-center gap-1 text-sm"><IoIosTimer />Timestamp</span>
                            <span className="float-right text-xs">{moment(findings?.initialLocation.timestamp).format("MMM-DD-YY, h:mm a")}</span>
                        </div>
                    </div>)}
                </div>

                <div className="bg-white rounded-lg p-3 mb-3 shadow-md">
                    <h3 className="mb-3">Final Location</h3>
                    {loading && (
                    <div className="w-full h-[100px] flex items-center justify-center">
                        <img src={loader} alt="Loading" className="w-10" />
                    </div>
                    )}
                    {(!loading && !findings) && (
                    <div className="h-[100px]">
                        <p className="text-center">Can't find final location</p>
                    </div>)}
                    {(!loading && findings) && (
                    <div>
                        <div className="mb-2 pb-2 flex justify-between items-center">
                            <span className="flex items-center gap-1 text-sm"><TbWorldLongitude />Longitude</span>
                            <span className="float-right text-xs">{findings?.finalLocation.lon}</span>
                        </div>
                        <div className="border-b border-stroke-clr mb-2 pb-2 flex justify-between items-center">
                            <span className="flex items-center gap-1 text-sm"><TbWorldLatitude />Latitude</span>
                            <span className="float-right text-xs">{findings?.finalLocation.lat}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="flex items-center gap-1 text-sm"><IoIosTimer />Timestamp</span>
                            <span className="float-right text-xs">{moment(findings?.finalLocation.timestamp).format("MMM-DD-YY, h:mm a")}</span>
                        </div>
                    </div>)}
                </div>
            </div>
        </div>
    </>
    );
};

export default AddressDetail;
