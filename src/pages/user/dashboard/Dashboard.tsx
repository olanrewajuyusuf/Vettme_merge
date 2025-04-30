import { Card } from "@/components/ui/card";
import { useFetchUserVerifications } from "@/hooks/basic/Vett";
import { Verification } from "@/lib/definitions";
import { FaLaptopCode } from "react-icons/fa";
import { FaBarsProgress } from "react-icons/fa6";
import { GiProgression } from "react-icons/gi";
import { GoDotFill } from "react-icons/go";
import { useEffect, useState } from "react";
import { useFetchCardData } from "@/hooks/company";
import { DashboardCard, DashboardCardAPI } from "./DashboardCard";
import GradientBar from "./GradientBar";

interface CardProps {
  verified: number,
  inprogress: number,
  pending: number,
  failed: number,
}

export default function Dashboard() {
  const { data: verifications } = useFetchUserVerifications();
  const { fetchCardData } = useFetchCardData();
  const [cardData, setCardData] = useState<CardProps | null>(null);

  useEffect(() => {
      const getCardData = async () => {
        try {
          const data = await fetchCardData();
            setCardData(data.data);
        } catch (error) {
          console.error("Failed to fetch card data:", error);
        }
      }
      getCardData();
  }, [fetchCardData]);
  
  const successfulVetts = verifications?.filter((vett: Verification) => {
    return vett.status === "success";
  });

  const failedVetts = verifications?.filter((vett: Verification) => {
    return vett.status === "failure";
  });

  function calculatePercentages(): number[] {
    const basicValue = verifications?.length || 0;
    const proValue = (cardData?.verified || 0) + (cardData?.inprogress || 0) + (cardData?.pending || 0) + (cardData?.failed || 0);
    const apiValue = (cardData?.verified || 0) + (cardData?.inprogress || 0) + (cardData?.pending || 0) + (cardData?.failed || 0);
    const values = [basicValue, proValue, apiValue];

    const total = values.reduce((sum, val) => sum + val, 0);
    return values.map(val => parseFloat(((val / total) * 100).toFixed(2)));
  }
  const percentages = calculatePercentages();

  return (
    <>
    <div>
      <h3>All Verifications</h3>
      <Card className="p-5">
        <GradientBar values={percentages} />
        <hr />
        <div className="flex items-center gap-5 text-xs mt-3">
          <p className="flex items-center gap-1"><GoDotFill className="text-destructive text-lg"/>Basic  <span className="text-gray-400 ml-2">{percentages[0]}%</span></p>
          <p className="flex items-center gap-1"><GoDotFill className="text-purple-500 text-lg"/>Pro <span className="text-gray-400 ml-2">{percentages[1]}%</span></p>
          <p className="flex items-center gap-1"><GoDotFill className="text-blue-500 text-lg"/>API <span className="text-gray-400 ml-2">{percentages[2]}%</span></p>
        </div>
      </Card>
    </div>
    <div className="grid grid-cols-3 gap-5 mt-10">
      <DashboardCard 
      icon={<FaBarsProgress />} 
      name="Vettme Basic" 
      color="text-destructive" 
      total={verifications?.length || 0} 
      failed={failedVetts?.length || 0} 
      success={successfulVetts?.length || 0} 
      pending={0}
      />
      <DashboardCard 
      icon={<GiProgression />} 
      name="Vettme Pro" 
      color="text-purple-500" 
      total={(cardData?.verified || 0) + (cardData?.inprogress || 0) + (cardData?.pending || 0) + (cardData?.failed || 0)} 
      failed={cardData?.failed || 0} 
      success={cardData?.verified || 0} 
      pending={cardData?.pending || 0}
      />
      <DashboardCardAPI 
      icon={<FaLaptopCode />}
      name="Vettme API" 
      color="text-blue-500"
      total={(cardData?.verified || 0) + (cardData?.inprogress || 0) + (cardData?.pending || 0) + (cardData?.failed || 0)}
      live={cardData?.verified || 0}
      sandbox={cardData?.inprogress || 0}
      />
    </div>
    </>
  )
}