import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "@/api/baseUrl";
export const description = "An area chart with gradient fill";


const chartConfig = {
  successful: {
    label: "Successful Verifications",
    color: "green",
  },
  failed: {
    label: "Failed Verifications",
    color: "red",
  },
  ongoing: {
    label: "Ongoing Verifications",
    color: "purple",
  },
  total: {
    label: "Total Verifications",
    color: "var(--sroke-clr)",
  },
  pending: {
    label: "Pending Verifications",
    color: "yellow",
  },
} satisfies ChartConfig;

export default function DashboardChart() {
  const companyId = localStorage.getItem("companyId")
  const [chartData, setChartData] = useState()

  useEffect(() => {
    const getChartData = async() => {
      try{
        const res = await axios.get(`${baseUrl}/verification/month/${companyId}`)
        setChartData(res.data.data)        
      } catch(err){
        console.error(err);
      }
    }
    getChartData()
  }, [companyId])
  
  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 0,
          right: 0,
        }}
      >
        <CartesianGrid vertical={false} horizontal={true} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} tickCount={5} />
        <ChartTooltip
          cursor={true}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <Area
          dataKey="total"
          type="linear"
          fill="var(--stroke-clr)"
          fillOpacity={0.4}
          stroke="var(--stroke-clr)"
        />
        <Area
          dataKey="successful"
          type="linear"
          fill="var(--color-successful)"
          fillOpacity={0.4}
          stroke="var(--color-successful)"
        />
        <Area
          dataKey="failed"
          type="linear"
          fill="var(--color-failed)"
          fillOpacity={0.4}
          stroke="var(--color-failed)"
        />
        <Area
          dataKey="pending"
          type="linear"
          fill="var(--color-pending)"
          fillOpacity={0.4}
          stroke="var(--color-pending)"
        />
        <Area
          dataKey="ongoing"
          type="linear"
          fill="var(--color-ongoing)"
          fillOpacity={0.4}
          stroke="var(--color-ongoing)"
        />
      </AreaChart>
    </ChartContainer>
  );
}