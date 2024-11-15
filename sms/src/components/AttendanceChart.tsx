"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A multiple bar chart";

const chartConfig = {
  present: {
    label: "Present",
    color: "hsl(var(--chart-2))",
  },
  absent: {
    label: "Absent",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function AttendanceChart({
  chartData,
  chartConfig = {},
  name,
}: {
  chartData: any;
  chartConfig: any;
  name: string;
}) {
  const year = new Date().getFullYear();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance Chart</CardTitle>
        <CardDescription>January - Decembar {year}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="present" fill="var(--color-present)" radius={4} />
            <Bar dataKey="absent" fill="var(--color-absent)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total {name} Attendance for the last 1 Year
        </div>
      </CardFooter>
    </Card>
  );
}
