"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

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

const chartConfig = {
  present: {
    label: "Present",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function AttedanceChart({
  chartData,
  name,
}: {
  chartData: any;
  name: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name} Attendance</CardTitle>
        <CardDescription>
          Showing {name.toLowerCase()} Attedance percentage for this year
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />

            <Area
              dataKey="present"
              type="natural"
              fill="var(--color-present)"
              fillOpacity={0.4}
              stroke="var(--color-present)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          Attendance Graph Of This Year
        </div>
      </CardFooter>
    </Card>
  );
}
