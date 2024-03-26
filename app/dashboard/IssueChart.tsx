"use client";

import { Card, Heading } from "@radix-ui/themes";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

type Props = {
  opens: number;
  closes: number;
  inProgresses: number;
};

const IssueChart = ({ closes, inProgresses, opens }: Props) => {
  const data = [
    { lable: "Open", value: opens },
    { lable: "In Progress", value: inProgresses },
    { lable: "Close", value: closes },
  ];
  return (
    <Card>
      <Heading my="3" mb="5" mx={"3"}>
        Chart Statuse
      </Heading>
      <ResponsiveContainer
        width={700}
        minWidth={100}
        minHeight={100}
        height="85%"
      >
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <XAxis dataKey="lable" />
          <YAxis />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Bar
            type="monotone"
            dataKey="value"
            barSize={45}
            fill="#abcdef"
            stroke="#8884d8"
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
