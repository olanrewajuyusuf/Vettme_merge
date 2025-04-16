import { getGeolocation } from "@/lib/geolocation";
import { useNavigate } from "react-router-dom";
import Nav from "../back-office/components/nav";
import { useEffect, useState } from "react";
import axios from "axios";
import { useFetchAgents } from "@/hooks/backOffice";
import { baseUrl } from "@/api/baseUrl";
import { VerificationSkeleton } from "@/components/SkeletonUi";
import Loader from "@/components/Loader";

interface Address {
  id: string,
  address: string,
  country: string,
  lga: string,
  state: string,
  personnelName: string,
  personnelId: string
}

interface Agent {
  agentName: string
}

const PersonnelsList = () => {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {fetchAgents} = useFetchAgents();

  useEffect(() => {
    const fieldAgentId = localStorage.getItem("fieldAgentId");
    const getAddresses = async () => {
      try {
        const res = await axios.get(
          `${baseUrl}/address/assigned/${fieldAgentId}?status=INPROGRESS`
        );
        setAddresses(res.data.data);
        console.log(res);
      } catch (err) {
        console.error(err);
        setError("No personnel data");
      } finally {
        setLoading(false);
      }
    };

    const getAgent = async () => {
      try {
        const res = await axios.get(
          `${baseUrl}/field-agent/${fieldAgentId}`
        );
        setAgent(res.data.data)
      } catch (err) {
        console.error(err);
      }
    };

    getAgent()
    getAddresses()
  }, [fetchAgents]);  

  const handleClick = (id: string): void => {
    getGeolocation(
      async (location, accuracy) => {
        console.log(
          "Latitude:",
          location.lat,
          "Longitude:",
          location.lon,
          "Accuracy:",
          accuracy
        );

        // Save the location to localStorage
        localStorage.setItem("savedLocations", JSON.stringify(location));
      },
      (errorMessage) => {
        alert(`Error: ${errorMessage}`);
      }
    );

    navigate(`address-form/${id}`);
  };
  
  return (
    <>
      <Nav title={agent?.agentName}/>
      <div className=" flow-root md:px-10 px-3">
        <h1 className="text-xl md:text-2xl font-light mb-3 md:mb-5">
          List of Personnels to verify
        </h1>
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-white p-2 md:pt-0 mb-10">
            <div className="md:hidden">
              {loading && (
                <div className="">
                  <Loader />
                </div>
              )}
              {error && (
                <div className="w-full h-[300px] flex justify-center items-center">
                  <h3>{error}</h3>
                </div>
              )}
              {addresses?.map((info) => (
                <div
                  key={info.id}
                  className="mb-2 w-full rounded-md bg-gray-100 px-2 py-2"
                >
                  <div className="flex items-center justify-between border-b-2 border-white">
                    <div>
                      <div className="mb-2 flex flex-col gap-1">
                        <div className="rounded-full w-6 h-6 bg-blue-500 text-white mr-1 grid place-items-center">
                          {info.personnelName.slice(0, 1)}
                        </div>
                        <p className="uppercase text-blue-900 w-[200px]">{info.personnelName}</p>
                      </div>
                    </div>
                    <div className="">
                      <button
                        onClick={() => handleClick(info.id)}
                        className="bg-blue-500 text-white text-xs md:text-[16px] md:px-5 md:py-2 p-2 leading-[15px] rounded-full border-[1px] border-blue-200 hover:bg-blue-800 hover:text-white"
                      >
                        Start Verification
                      </button>
                    </div>
                  </div>
                  <div className="pt-2">
                    <p className="text-gray-400 text-xs">{info.address}, {info.lga}, {info.state}, {info.country}</p>
                  </div>
                </div>
              ))}
            </div>
            {loading && (
                <div className="hidden md:flex flex-col gap-3">
                  <VerificationSkeleton />
                  <VerificationSkeleton />
                  <VerificationSkeleton />
                </div>
            )}
            {error && (
                <div className="hidden w-full h-[300px] md:flex justify-center items-center">
                  <h3>{error}</h3>
                </div>
            )}
            {!loading && !error && (
            <table className="hidden min-w-full text-gray-700 md:table">
              <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="py-5 font-medium sm:pl-6"></th>
                  <th scope="col" className="py-5 font-medium">
                    Name
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Address
                  </th>
                  <th scope="col" className="relative py-3 pl-6 pr-3">
                    <span className="sr-only">Start Button</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-50">
                {addresses?.map((info) => (
                  <tr
                    key={info.id}
                    className="w-full border-b-2 border-white py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap w-[5%]  py-3 pl-3">
                      <div className="rounded-full w-10 h-10 bg-white text-green-400 mr-1 grid place-items-center">
                        {info.personnelName.slice(0, 1)}
                      </div>
                    </td>
                    <td className="whitespace-nowrap py-3">{info.personnelName}</td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <div className="bg-blue-500 h-2 w-2"></div>
                      {info.address}, {info.lga}, {info.state}, {info.country}
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <button
                        onClick={() => handleClick(info.id)}
                        className="px-5 py-2 rounded-full border-[1px] border-destructive hover:bg-destructive hover:text-white"
                      >
                        Start Verification
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>)}
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonnelsList;
