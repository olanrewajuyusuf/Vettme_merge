import { Card, CardTitle } from "@/components/ui/card";
import { FaDotCircle, FaLaptopCode } from "react-icons/fa";
import { FaBarsProgress } from "react-icons/fa6";
import { GiProgression } from "react-icons/gi";
import { GoDotFill } from "react-icons/go";

export default function Dashboard() {
  const services = [
      {
        name: "Vettme Basic",
        icon: <FaBarsProgress />,
        color: "text-destructive",
        status: {total: "200", failed: "13", success: "150", pending: "37"},
      },
      {
        name: "Vettme PRO",
        icon: <GiProgression />,
        color: "text-purple-500",
        status: {total: "200", failed: "13", success: "150", pending: "37"},
      },
      {
        name: "Vettme API",
        icon: <FaLaptopCode />,
        color: "text-blue-500",
        status: {total: "200", failed: "13", success: "150", pending: "37"},
      },
    ]

  return (
    <>
    <div>
      <h3>All Verifications</h3>
      <Card className="p-5">
        <div className="slide w-full h-3 mb-5"></div>
        <div className="flex items-center gap-5 text-xs">
          <span className="flex items-center gap-2"><GoDotFill className="text-destructive text-lg"/>Basic</span>
          <span className="flex items-center gap-2"><GoDotFill className="text-purple-500 text-lg"/>Pro</span>
          <span className="flex items-center gap-2"><GoDotFill className="text-blue-500 text-lg"/>API</span>
        </div>
      </Card>
    </div>
    <div className="grid grid-cols-3 gap-5 mt-10">
      {services.map((service, ind) => (
        <Card key={ind} className="p-5">
          <CardTitle className="mb-5">
            <span className={`${service.color}`}>{service.icon}</span>
            <h3 className="mt-3">{service.name}</h3>
          </CardTitle>
          <hr />
          <div className="text-sm mt-5">
            <span className="flex justify-between items-center my-3">
              <span className="flex items-center gap-2 text-gray-500"><FaDotCircle className="text-green-600 text-xm"/>Successfull</span>
              <span className="text-gray-500">{service.status.success}</span>
            </span>
            <span className="flex justify-between items-center my-3">
              <span className="flex items-center gap-2 text-gray-500"><FaDotCircle className="text-blue-700 text-xm"/>Pending</span>
              <span className="text-gray-500">{service.status.pending}</span>
            </span>
            <span className="flex justify-between items-center my-3">
              <span className="flex items-center gap-2 text-gray-500"><FaDotCircle className="text-destructive text-xm"/>Failed</span>
              <span className="text-gray-500">{service.status.failed}</span>
            </span>
            <hr />
            <span className="flex justify-between items-center my-3">
              <span className="flex items-center gap-2"><FaDotCircle className=" text-xm"/> Total</span>
              <span>{service.status.total}</span>
            </span>
          </div>
        </Card>
      ))}
    </div>
    </>
  )
}