import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useFetchRecentActivities } from "@/hooks/app/apps";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import moment from "moment";

export default function DashboardChart() {
  const { isLoading, data: recent} = useFetchRecentActivities();
  console.log(recent, "recent data");
  
  
  const currentYear = new Date().getFullYear();

  const generateChartData = (recent: any[], currentYear: number) => {
    const months = [
      { name: "January", short: "jan" },
      { name: "February", short: "feb" },
      { name: "March", short: "mar" },
      { name: "April", short: "apr" },
      { name: "May", short: "may" },
      { name: "June", short: "jun" },
      { name: "July", short: "jul" },
      { name: "August", short: "aug" },
      { name: "September", short: "sep" },
      { name: "October", short: "oct" },
      { name: "November", short: "nov" }, 
      { name: "December", short: "dec" },
    ];

    const filterByMonthAndEnvironment = (
      monthShort: string,
      environment: string
    ) =>
      recent?.filter(
        (r: any) =>
          moment(r.date).format("MMM").toLowerCase() === monthShort &&
          moment(r.date).format("YYYY") === currentYear.toString() &&
          r.environment === environment
      ).length;

    return months?.map(({ name, short }) => ({
      month: name,
      sandbox: filterByMonthAndEnvironment(short, "sandbox"),
      live: filterByMonthAndEnvironment(short, "live"),
    }));
  };

  const chartData = generateChartData(recent, currentYear);

  const chartConfig = {
    sandbox: {
      label: "Sandbox",
      color: "#ABABAB",
    },
    live: {
      label: "Live",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  return isLoading ? (
    <div className="w-full h-full flex items-center justify-center flex-col gap-2">
      <div className="loader" />
      <p className="text-sm">Loading...</p>
    </div>
  ) : (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <BarChart accessibilityLayer data={chartData} margin={{ bottom: 40 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={true}
          tickMargin={10}
          axisLine={true}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <Bar dataKey="sandbox" fill="var(--color-sandbox)" radius={0} />
        <Bar dataKey="live" fill="var(--color-live)" radius={0} />
      </BarChart>
    </ChartContainer>
  );
}
