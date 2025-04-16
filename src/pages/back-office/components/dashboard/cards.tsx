import { useFetchCardsData, useFetchCompany } from "@/hooks/backOffice";
import { useEffect, useState } from "react";
import { FaRegTimesCircle } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdPendingActions } from "react-icons/md";
import { PiClockUserBold } from "react-icons/pi";
import { HiStatusOffline, HiStatusOnline } from "react-icons/hi";
import { GrMoney } from "react-icons/gr";
import { LuLandmark } from "react-icons/lu";

interface Cards {
  verified: number,
  failed: number,
  pending: number,
  inprogress: number,
}
const DashboardCards = () => {
  const [card, setCard] = useState<Cards | null>(null);
  const [companies, setCompanies] = useState<number | null>(null);
  const [active, setActive] = useState<number | null>(null);
  const [inactive, setInactive] = useState<number | null>(null);
  const {fetchCardsData} = useFetchCardsData();
  const { fetchCompany } = useFetchCompany();

  const cardsData = [
    {
      title: "Total Companies",
      qty: companies,
      bg: 0,
    },
    {
      title: "Active Companies",
      qty: active,
      bg: 0,
    },
    {
      title: "Inactive Companies",
      qty: inactive,
      bg: 0,
    },
    {
      title: "Total Verifications",
      qty: card && card?.verified + card?.pending + card?.inprogress + card?.failed,
      bg: 0,
    },
    {
      title: "Successful Verifications",
      qty: card?.verified,
      bg: 1,
    },
    {
      title: "Pending Verifications",
      qty: card?.pending,
      bg: 2,
    },
    {
      title: "Ongoing Verifications",
      qty: card?.inprogress,
      bg: 3,
    },
    {
      title: "Failed Verifications",
      qty: card?.failed,
      bg: 4,
    },
  ];

  useEffect(()=>{
    const getCardsData = async () => {
      try {
        const data = await fetchCardsData();        
        setCard(data.data);
      } catch (error) {
        console.error("Failed to fetch cards data:", error);
      }
    };

    const getCompanyInfo = async () => {
      try {
        const data = await fetchCompany();        
        const company = data.result.companies
        const active = company.filter((item: any)=> item.isActive).length
        const inactive = company.filter((item: any)=> !item.isActive).length
        setCompanies(company.length);
        setActive(active);
        setInactive(inactive);
      } catch (error) {
        console.error("Failed to fetch company info:", error);
      }
    };

    getCompanyInfo();
    getCardsData();
  }, [fetchCardsData, fetchCompany])  

  return (
    <div className="grid grid-cols-4 gap-6 mb-6">
        {cardsData.map((card, idx) => (
          <div
            key={idx}
            className="w-full p-4 rounded-xl border-[1px] border-stroke-clr bg-white"
          >
            <div className="flex items-center gap-3">
              <span
                className={`min-w-10 min-h-10 rounded-full flex items-center justify-center text-white ${
                  card.bg === 1
                    ? "bg-green-600"
                    : card.bg === 2
                    ? "bg-yellow-500"
                    : card.bg === 3
                    ? "bg-purple-700"
                    : card.bg === 4
                    ? "bg-red-600"
                    : "transparent"
                }`}
              >
                {card.bg === 1
                ? <IoMdCheckmarkCircleOutline />
                : card.bg === 2
                ? <MdPendingActions />
                : card.bg === 3
                ? <PiClockUserBold />
                : card.bg === 4
                ? <FaRegTimesCircle />
                : card.title === "Active Companies"
                ? <HiStatusOnline className="text-black text-2xl" />
                : card.title === "Inactive Companies"
                ? <HiStatusOffline className="text-black text-2xl" />
                : card.title === "Total Verifications"
                ? <GrMoney className="text-black text-2xl" />
                : <LuLandmark className="text-black text-2xl" />
                }
              </span>
              <p className={`font-medium ${card.bg === 0 && "text-blue-500"}`}>{card.title}</p>
            </div>
            <h1 className={`mt-4 ${card.bg === 0 && "text-center"}`}>{card.qty}</h1>
          </div>
        ))}
      </div>
  )
}

export default DashboardCards;