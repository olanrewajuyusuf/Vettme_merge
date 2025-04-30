import { Card, CardTitle } from "@/components/ui/card";
import { FaDotCircle } from "react-icons/fa";

interface DashboardProps {
    icon: JSX.Element;
    name: string;
    color: string;
    total: number;
    failed: number;
    success: number;
    pending?: number;
}

export function DashboardCard({icon, name, color, total, failed, success, pending}: DashboardProps) {
  return (
    <Card className="p-5">
        <CardTitle className="mb-5">
        <span className={`${color}`}>{icon}</span>
        <span className="mt-3 text-lg">{name}</span>
        </CardTitle>
        <hr />
        <div className="text-sm mt-5">
        <span className="flex justify-between items-center my-3">
            <span className="flex items-center gap-2 text-gray-500"><FaDotCircle className="text-green-600 text-xm"/>Successfull</span>
            <span className="text-gray-500">{success}</span>
        </span>
        <span className="flex justify-between items-center my-3">
            <span className="flex items-center gap-2 text-gray-500"><FaDotCircle className="text-blue-700 text-xm"/>Pending</span>
            <span className="text-gray-500">{pending}</span>
        </span>
        <span className="flex justify-between items-center my-3">
            <span className="flex items-center gap-2 text-gray-500"><FaDotCircle className="text-destructive text-xm"/>Failed</span>
            <span className="text-gray-500">{failed}</span>
        </span>
        <hr />
        <span className="flex justify-between items-center my-3">
            <span className="flex items-center gap-2"><FaDotCircle className=" text-xm"/> Total</span>
            <span>{total}</span>
        </span>
        </div>
    </Card>
  )
}

interface DashboardAPIProps {
    icon: JSX.Element;
    name: string;
    color: string;
    total: number;
    live: number;
    sandbox: number;
}

export function DashboardCardAPI({icon, name, color, total, live, sandbox}: DashboardAPIProps) {
  return (
    <Card className="p-5 flex flex-col justify-between">
        <div>
            <CardTitle className="mb-5">
                <span className={`${color}`}>{icon}</span>
                <span className="mt-3 text-lg">{name}</span>
            </CardTitle>
            <hr />
            <div className="text-sm mt-5">
                <span className="flex justify-between items-center my-3">
                    <span className="flex items-center gap-2 text-gray-500"><FaDotCircle className="text-green-600 text-xm"/>Live</span>
                    <span className="text-gray-500">{live}</span>
                </span>
                <span className="flex justify-between items-center my-3">
                    <span className="flex items-center gap-2 text-gray-500"><FaDotCircle className="text-blue-700 text-xm"/>Sandbox</span>
                    <span className="text-gray-500">{sandbox}</span>
                </span>
            </div>
        </div>
        <div className="text-sm mt-5">
            <hr />
            <span className="flex justify-between items-center my-3">
                <span className="flex items-center gap-2"><FaDotCircle className=" text-xm"/> Total</span>
                <span>{total}</span>
            </span>
        </div>
    </Card>
  )
}